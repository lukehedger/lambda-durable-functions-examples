import {
	type DurableContext,
	retryPresets,
	withDurableExecution,
} from "@aws/durable-execution-sdk-js";

export const handler = withDurableExecution(
	async (event: { simulateFailure?: boolean }, context: DurableContext) => {
		// keep track of compensations required in the event of failure
		const completedSteps: Array<{ name: string; rollback: () => void }> = [];

		try {
			await context.step(
				"reserve-inventory",
				async (ctx) => {
					ctx.logger.info("Reserving inventory");

					// add compensation function after successful execution
					completedSteps.push({
						name: "reserve-inventory",
						rollback: () => {
							context.logger.info("Releasing inventory reservation");
						},
					});
				},
				{ retryStrategy: retryPresets.default },
			);

			await context.step(
				"process-payment",
				async (ctx) => {
					ctx.logger.info("Processing payment");

					// simulate failure if requested
					if (event.simulateFailure) {
						context.logger.error("Payment processing failed");

						throw new Error("Payment processing failed");
					}

					completedSteps.push({
						name: "process-payment",
						rollback: () => {
							context.logger.info("Refunding payment");
						},
					});
				},
				{ retryStrategy: retryPresets.default },
			);

			await context.step(
				"create-shipment",
				async (ctx) => {
					ctx.logger.info("Creating shipment");

					completedSteps.push({
						name: "create-shipment",
						rollback: () => {
							context.logger.info("Cancelling shipment");
						},
					});
				},
				{ retryStrategy: retryPresets.default },
			);

			context.logger.info("all steps completed successfully");

			return {
				status: 200,
			};
		} catch (error) {
			context.logger.error("transaction failed, initiating rollback", {
				error,
			});

			await context.runInChildContext("compensation", async (childCtx) => {
				// execute compensations in reverse order
				for (const step of completedSteps.reverse()) {
					await childCtx.step(
						`compensate-${step.name}`,
						async (ctx) => {
							step.rollback();

							ctx.logger.info(`compensation executed: ${step.name}`);
						},
						{ retryStrategy: retryPresets.default },
					);
				}
			});

			context.logger.info("rollback completed");

			return {
				status: 500,
			};
		}
	},
);
