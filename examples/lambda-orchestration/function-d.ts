import {
	type DurableContext,
	withDurableExecution,
} from "@aws/durable-execution-sdk-js";

export const handler = withDurableExecution(
	async (_event: unknown, context: DurableContext) => {
		if (
			!process.env.FUNCTION_A_ARN ||
			!process.env.FUNCTION_B_ARN ||
			!process.env.FUNCTION_C_ARN
		) {
			throw new Error("Missing environment variables");
		}

		// the execution of function-d is suspended until function-a completes!
		await context.invoke("invoke-function-a", process.env.FUNCTION_A_ARN, {
			data: { name: "Function D" },
		});

		await context.invoke("invoke-function-b", process.env.FUNCTION_B_ARN, {
			data: { name: "Function D" },
		});

		await context.invoke("invoke-function-c", process.env.FUNCTION_C_ARN, {
			data: { name: "Function D" },
		});

		return {
			status: 200,
		};
	},
);
