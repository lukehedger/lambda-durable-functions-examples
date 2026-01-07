import { App } from "aws-cdk-lib";
import { ApiGateway } from "./stack";

new ApiGateway(new App(), "ApiGateway", {
	env: {
		region: "eu-central-1",
	},
});
