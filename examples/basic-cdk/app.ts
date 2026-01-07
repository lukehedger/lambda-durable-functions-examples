import { App } from "aws-cdk-lib";
import { BasicCdk } from "./stack";

new BasicCdk(new App(), "BasicCdk", {
	env: {
		region: "eu-central-1",
	},
});
