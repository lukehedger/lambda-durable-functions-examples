import {
	type DurableContext,
	withDurableExecution,
} from "@aws/durable-execution-sdk-js";

export const handler = withDurableExecution(
	async (_event: unknown, context: DurableContext) => {
		await context.step("reserve-inventory", async (ctx) => {
			ctx.logger.info("Reserving inventory");
			return {};
		});

		await context.step("process-payment", async (ctx) => {
			ctx.logger.info("Processing payment");
			return {};
		});

		await context.step("create-shipment", async (ctx) => {
			ctx.logger.info("Creating shipment");
			return {};
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ message: "Order processed successfully" }),
		};
	},
);
