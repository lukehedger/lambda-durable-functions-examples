import { App } from "aws-cdk-lib";
import { Workflow } from "./stack";

new Workflow(new App(), "Workflow", {
	env: {
		region: "us-east-2", // note: durable functions currently only supported in us-east-2
	},
});
