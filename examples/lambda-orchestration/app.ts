import { App } from "aws-cdk-lib";
import { LambdaOrchestration } from "./stack";

new LambdaOrchestration(new App(), "LambdaOrchestration", {
	env: {
		region: "eu-central-1",
	},
});
