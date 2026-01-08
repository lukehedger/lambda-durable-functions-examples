import { App } from "aws-cdk-lib";
import { Saga } from "./stack";

new Saga(new App(), "Saga", {
	env: {
		region: "eu-central-1",
	},
});
