import { equal } from "node:assert/strict";
import { test } from "node:test";
import { LocalDurableTestRunner } from "@aws/durable-execution-sdk-js-testing";
import { handler } from "./function";

test.beforeEach(async () => {
	await LocalDurableTestRunner.setupTestEnvironment({ skipTime: true });
});

test.afterEach(async () => {
	await LocalDurableTestRunner.teardownTestEnvironment();
});

test("addition works correctly", async () => {
	const runner = new LocalDurableTestRunner({ handlerFunction: handler });

	const result = await runner.run({
		payload: { a: 5, b: 3 },
	});

	equal(result.getStatus(), "SUCCEEDED");
	equal(result.getResult(), 8);
});
