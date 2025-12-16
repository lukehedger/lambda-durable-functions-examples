import {
	type DurableContext,
	withDurableExecution,
} from "@aws/durable-execution-sdk-js";

export const handler = withDurableExecution(
	async (event, context: DurableContext) => {
		console.log(event);

		const result = await context.step("calculate", async () => {
			return event.a + event.b;
		});

		return result;
	},
);
