# lambda-orchestration

Example showing how to orchestrate multiple Lambda functions (microservices) using a durable function. Each Lambda function returns a synchronous response in this example.

The example also shows how X-Ray can be used to trace the execution of the orchestration.

## Deployment

Install dependencies:

```sh
bun install
```

Deploy example:

```sh
bun run cdk deploy
```

Note: The only region that currently supports durable Lambda functions is `us-east-2` (Ohio).
