# basic-error-handling

This is a basic example of using AWS CDK to deploy a durable Lambda function with error handling via retry strategies.

See the [Retries for Lambda durable functions](https://docs.aws.amazon.com/lambda/latest/dg/durable-execution-sdk-retries.html) for more information.

## Deployment

Install dependencies:

```sh
bun install
```

Deploy example:

```sh
bun run cdk deploy
```
