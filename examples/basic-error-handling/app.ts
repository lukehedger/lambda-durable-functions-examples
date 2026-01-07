import { App } from "aws-cdk-lib";
import { BasicErrorHandling } from "./stack";

new BasicErrorHandling(new App(), "BasicErrorHandling", {
	env: {
		region: "eu-central-1",
	},
});
