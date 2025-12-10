import {
	LambdaClient,
	SendDurableExecutionCallbackSuccessCommand,
} from "@aws-sdk/client-lambda";
import type { APIGatewayEvent } from "aws-lambda";

const lambdaClient = new LambdaClient();

export const handler = async (event: APIGatewayEvent) => {
	console.log("Function A invoked");

	if (!event.body) {
		throw new Error("Missing body");
	}

	const { callbackId } = JSON.parse(event.body);

	await lambdaClient.send(
		new SendDurableExecutionCallbackSuccessCommand({
			CallbackId: callbackId,
		}),
	);

	return {
		status: 200,
	};
};
