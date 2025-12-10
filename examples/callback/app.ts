import { App } from "aws-cdk-lib";
import { Callback } from "./stack";

new Callback(new App(), "Callback", {
	env: {
		region: "us-east-2", // note: durable functions currently only supported in us-east-2
	},
});
