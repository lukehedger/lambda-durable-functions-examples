import path from "node:path";
import { type App, Duration, Stack, type StackProps } from "aws-cdk-lib";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";

export const Saga = class extends Stack {
	constructor(scope: App, id: string, props?: StackProps) {
		super(scope, id, props);

		new NodejsFunction(this, "Saga", {
			architecture: Architecture.ARM_64,
			bundling: {
				format: OutputFormat.ESM,
				minify: true,
				sourceMap: true,
			},
			entry: path.join(__dirname, "./function.ts"),
			durableConfig: {
				executionTimeout: Duration.minutes(3),
				retentionPeriod: Duration.days(1),
			},
			functionName: "saga",
			handler: "index.handler",
			runtime: Runtime.NODEJS_24_X,
		});
	}
};
