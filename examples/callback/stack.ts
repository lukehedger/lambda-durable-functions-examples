import path from "node:path";
import { type App, Duration, Stack, type StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";

export const Callback = class extends Stack {
	constructor(scope: App, id: string, props?: StackProps) {
		super(scope, id, props);

		const functionA = new NodejsFunction(this, "Callback-FunctionA", {
			architecture: Architecture.ARM_64,
			bundling: {
				/* An empty externalModules array tells esbuild to
				 * bundle everything, including AWS SDK.
				 * This is needed to ensure the latest version of the
				 * AWS SDK is used, rather than the one bundled with
				 * the Lambda Node.js runtime, which is an older version
				 * not containing the durable function commands. */
				externalModules: [],
			},
			entry: path.join(__dirname, "./function-a.ts"),
			functionName: "callback-function-a",
			handler: "index.handler",
			runtime: Runtime.NODEJS_24_X,
		});

		const api = new RestApi(this, "Callback-Api", {
			restApiName: "callback-api",
		});

		api.root.addMethod("POST", new LambdaIntegration(functionA));

		const functionD = new NodejsFunction(this, "Callback-FunctionD", {
			architecture: Architecture.ARM_64,
			bundling: {
				format: OutputFormat.ESM,
				minify: true,
				sourceMap: true,
			},
			entry: path.join(__dirname, "./function-d.ts"),
			environment: {
				CALLBACK_API_URL: `https://${api.restApiId}.execute-api.${this.region}.amazonaws.com/prod/`,
			},
			durableConfig: {
				executionTimeout: Duration.minutes(2),
				retentionPeriod: Duration.days(1),
			},
			functionName: "callback-function-d",
			handler: "index.handler",
			runtime: Runtime.NODEJS_24_X,
		});

		functionA.addToRolePolicy(
			new PolicyStatement({
				actions: ["lambda:SendDurableExecutionCallbackSuccess"],
				resources: [
					`${functionD.latestVersion.functionArn}/durable-execution/*`,
				],
			}),
		);
	}
};
