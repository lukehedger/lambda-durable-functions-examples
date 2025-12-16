// NOTE: This does not currently work. Issue raised: https://github.com/aws/aws-durable-execution-sdk-js/issues/394

import { afterAll, beforeAll, expect, test } from "bun:test";
import {
	type DurableContext,
	withDurableExecution,
} from "@aws/durable-execution-sdk-js";
import { LocalDurableTestRunner } from "@aws/durable-execution-sdk-js-testing";

const handler = withDurableExecution(async (event, context: DurableContext) => {
	console.log(event);

	const result = await context.step("calculate", async () => {
		return event.a + event.b;
	});

	return result;
});

beforeAll(async () => {
	await LocalDurableTestRunner.setupTestEnvironment({ skipTime: true });
});

afterAll(async () => {
	await LocalDurableTestRunner.teardownTestEnvironment();
});

test("addition works correctly", async () => {
	const runner = new LocalDurableTestRunner({ handlerFunction: handler });

	const result = await runner.run({
		payload: { a: 5, b: 3 },
	});

	expect(result.getStatus()).toBe("SUCCEEDED");
	expect(result.getResult()).toEqual(8);
});
