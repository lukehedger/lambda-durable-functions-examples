import path from "node:path";
import { type App, Duration, Stack, type StackProps } from "aws-cdk-lib";
import { Architecture, Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";

export const LambdaOrchestration = class extends Stack {
	constructor(scope: App, id: string, props?: StackProps) {
		super(scope, id, props);

		const functionA = new NodejsFunction(
			this,
			"LambdaOrchestration-FunctionA",
			{
				architecture: Architecture.ARM_64,
				bundling: {
					format: OutputFormat.ESM,
					minify: true,
					sourceMap: true,
				},
				entry: path.join(__dirname, "./function-a.ts"),
				functionName: "lambda-orchestration-function-a",
				handler: "index.handler",
				runtime: Runtime.NODEJS_24_X,
				tracing: Tracing.ACTIVE,
			},
		);

		const functionB = new NodejsFunction(
			this,
			"LambdaOrchestration-FunctionB",
			{
				architecture: Architecture.ARM_64,
				bundling: {
					format: OutputFormat.ESM,
					minify: true,
					sourceMap: true,
				},
				entry: path.join(__dirname, "./function-b.ts"),
				functionName: "lambda-orchestration-function-b",
				handler: "index.handler",
				runtime: Runtime.NODEJS_24_X,
				tracing: Tracing.ACTIVE,
			},
		);

		const functionC = new NodejsFunction(
			this,
			"LambdaOrchestration-FunctionC",
			{
				architecture: Architecture.ARM_64,
				bundling: {
					format: OutputFormat.ESM,
					minify: true,
					sourceMap: true,
				},
				entry: path.join(__dirname, "./function-c.ts"),
				functionName: "lambda-orchestration-function-c",
				handler: "index.handler",
				runtime: Runtime.NODEJS_24_X,
				tracing: Tracing.ACTIVE,
			},
		);

		const functionD = new NodejsFunction(
			this,
			"LambdaOrchestration-FunctionD",
			{
				architecture: Architecture.ARM_64,
				bundling: {
					format: OutputFormat.ESM,
					minify: true,
					sourceMap: true,
				},
				entry: path.join(__dirname, "./function-d.ts"),
				environment: {
					FUNCTION_A_ARN: functionA.functionArn,
					FUNCTION_B_ARN: functionB.functionArn,
					FUNCTION_C_ARN: functionC.functionArn,
				},
				durableConfig: {
					executionTimeout: Duration.minutes(1),
					retentionPeriod: Duration.days(1),
				},
				functionName: "lambda-orchestration-function-d",
				handler: "index.handler",
				runtime: Runtime.NODEJS_24_X,
				tracing: Tracing.ACTIVE,
			},
		);

		functionA.grantInvoke(functionD);
		functionB.grantInvoke(functionD);
		functionC.grantInvoke(functionD);
	}
};
