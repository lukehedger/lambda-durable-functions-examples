import { withDurableExecution } from "@aws/durable-execution-sdk-js";

export const handler = withDurableExecution(async () => {
	return {
		status: 200,
	};
});
