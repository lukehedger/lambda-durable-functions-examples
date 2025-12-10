import path from "node:path";
import { type App, Duration, Stack, type StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";

export const ApiGateway = class extends Stack {
	constructor(scope: App, id: string, props?: StackProps) {
		super(scope, id, props);

		const durableFunction = new NodejsFunction(this, "ApiGateway", {
			architecture: Architecture.ARM_64,
			bundling: {
				format: OutputFormat.ESM,
				minify: true,
				sourceMap: true,
			},
			entry: path.join(__dirname, "./function.ts"),
			durableConfig: {
				executionTimeout: Duration.minutes(1),
				retentionPeriod: Duration.days(1),
			},
			functionName: "apigateway",
			handler: "index.handler",
			runtime: Runtime.NODEJS_24_X,
		});

		const api = new RestApi(this, "ApiGateway-Api", {
			restApiName: "apigateway-api",
		});

		// Must use a qualified ARN to invoke a durable function (via a Lambda version or alias)
		const durableFunctionVersion = durableFunction.currentVersion;

		api.root.addMethod("POST", new LambdaIntegration(durableFunctionVersion));
	}
};
