import { App } from "aws-cdk-lib";
import { LambdaOrchestration } from "./stack";

new LambdaOrchestration(new App(), "LambdaOrchestration", {
	env: {
		region: "us-east-2", // note: durable functions currently only supported in us-east-2
	},
});
