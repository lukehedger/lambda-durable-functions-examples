# Lambda durable functions examples

A growing collection of examples demonstrating how to use Lambda durable functions.

## Examples

- [API Gateway trigger](/examples/api-gateway)
- [Basic CDK](/examples/basic-cdk)
- [Async callback](/examples/callback)
- [Lambda orchestration](/examples/lambda-orchestration)
- [Unit testing](/examples/testing)
- [Branching workflow](/examples/workflow)

## Concepts

### `withDurableExecution` wrapper

A durable Lambda function must be wrapped with the `withDurableExecution` wrapper. The wrapper enables durable execution by providing the [`DurableContext`](#durablecontext) object and managing checkpoint operations.

### `DurableContext`

A durable function receives a `DurableContext` instead of the [standard Lambda context](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html).

This object provides methods for durable operations like `context.step()` and `context.wait()` that create checkpoints.

### Steps

Steps (defined with `context.step()`) run business logic with built-in retries and automatic checkpointing.

### Waits

A `context.wait()` call pauses execution without consuming compute resources. This means your Lambda function is not sitting idle whilst waiting to resume. When the wait completes, Lambda invokes your function again and replays the checkpoint log, substituting stored values for completed steps.

### Checkpoints

Each `context.step()` (and `context.wait()`) call in a durable function will create a checkpoint after execution. A checkpoint is a record of the function's progress and state at a specific point in time. It allows the function to resume from the last completed checkpoint if it is interrupted or fails. Each checkpoint records the operation type, inputs and results.

If your function is interrupted, it resumes from the last completed checkpoint. The function doesn't re-execute completed steps. It uses their *stored results* instead.

For more information, see [How checkpointing works](https://docs.aws.amazon.com/lambda/latest/dg/durable-execution-sdk.html#durable-sdk-how-checkpointing-works).

### Determinism

Durable function code **must be deterministic** to ensure consistent behavior across executions and replays. If the code is not deterministic, the function may produce different results than expected on replay.

Always wrap non-deterministic operations, such as HTTP calls, in steps.

For more information, see [Write deterministic code](https://docs.aws.amazon.com/lambda/latest/dg/durable-best-practices.html#durable-determinism).

### Versioning

 Durable functions must be invoked with version numbers or aliases (using a fully qualified ARN). This ensures each execution is pinned to specific versions of your function's code.
