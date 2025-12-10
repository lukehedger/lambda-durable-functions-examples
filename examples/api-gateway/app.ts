import { App } from "aws-cdk-lib";
import { ApiGateway } from "./stack";

new ApiGateway(new App(), "ApiGateway", {
	env: {
		region: "us-east-2", // note: durable functions currently only supported in us-east-2
	},
});
