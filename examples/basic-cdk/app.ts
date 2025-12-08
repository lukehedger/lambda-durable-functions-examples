import { App } from "aws-cdk-lib";
import { BasicCdk } from "./stack";

new BasicCdk(new App(), "BasicCdk", {
	env: {
		region: "us-east-2", // note: durable functions currently only supported in us-east-2
	},
});
