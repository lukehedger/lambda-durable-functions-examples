import {
	type DurableContext,
	retryPresets,
	withDurableExecution,
} from "@aws/durable-execution-sdk-js";

export const handler = withDurableExecution(
	async (_event: unknown, context: DurableContext) => {
		try {
			await context.step(
				"reserve-inventory",
				async (ctx) => {
					ctx.logger.info("Reserving inventory");
					return {};
				},
				{
					retryStrategy: retryPresets.default,
				},
			);

			await context.wait({ seconds: 1 });

			await context.step(
				"process-payment",
				async (ctx) => {
					ctx.logger.info("Processing payment");
					return {};
				},
				{
					retryStrategy: retryPresets.default,
				},
			);

			await context.step(
				"create-shipment",
				async (ctx) => {
					ctx.logger.info("Creating shipment");
					return {};
				},
				{
					retryStrategy: retryPresets.default,
				},
			);

			return {
				status: 200,
			};
		} catch (error) {
			context.logger.error(error);

			return {
				status: 500,
			};
		}
	},
);
