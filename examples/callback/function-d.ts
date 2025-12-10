import {
	type DurableContext,
	withDurableExecution,
} from "@aws/durable-execution-sdk-js";

export const handler = withDurableExecution(
	async (_event: unknown, context: DurableContext) => {
		const { CALLBACK_API_URL } = process.env;

		if (!CALLBACK_API_URL) {
			throw new Error("Missing CALLBACK_API_URL environment variable");
		}

		await context.waitForCallback(
			"external-api",
			async (callbackId) => {
				await fetch(CALLBACK_API_URL, {
					method: "POST",
					body: JSON.stringify({ callbackId }),
					headers: {
						"Content-Type": "application/json",
					},
				});
			},
			{ timeout: { minutes: 1 } },
		);

		return {
			status: 200,
		};
	},
);
