# basic-cdk

This is a basic example of using AWS CDK to deploy a durable Lambda function.

There are two properties that can be configured:

- `executionTimeout`: The maximum amount of time the durable function can run before it is stopped. Between 1 second and 366 days *
- `retentionPeriod`: The number of days to retain the durable function's execution history (after it is closed). Between 1 and 90 days.

\* Note: You cannot synchronously invoke a durable function if the timeout is greater than 15 minutes.

See the [`DurableConfig` AWS CDK documentation](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.DurableConfig.html) for more information.

## Deployment

Install dependencies:

```sh
bun install
```

Deploy example:

```sh
bun run cdk deploy
```
