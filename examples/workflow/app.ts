import { App } from "aws-cdk-lib";
import { Workflow } from "./stack";

new Workflow(new App(), "Workflow", {
	env: {
		region: "eu-central-1",
	},
});
