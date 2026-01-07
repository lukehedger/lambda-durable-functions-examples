import { App } from "aws-cdk-lib";
import { Callback } from "./stack";

new Callback(new App(), "Callback", {
	env: {
		region: "eu-central-1",
	},
});
