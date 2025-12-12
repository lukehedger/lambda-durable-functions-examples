import { afterAll, beforeAll, expect, test } from "bun:test";
import { LocalDurableTestRunner } from "@aws/durable-execution-sdk-js-testing";
import { handler } from "./function";

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
