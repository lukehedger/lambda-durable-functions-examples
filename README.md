# Lambda durable functions examples

## Concepts

### `withDurableExecution` wrapper

A durable Lambda function must be wrapped with the `withDurableExecution` wrapper. The wrapper enables durable execution by providing the [`DurableContext`](#durablecontext) object and managing checkpoint operations.

### `DurableContext`

A durable function receives a `DurableContext` instead of the [standard Lambda context](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html).

This object provides methods for durable operations like `step()` and `wait()` that create checkpoints.

### Checkpoints

<!--TOOD: what is a checkpoint? -->

If your function is interrupted, it resumes from the last completed checkpoint. The function doesn't re-execute completed steps. It uses their *stored results* instead.

Each `context.step()` call in your function code creates a checkpoint before and after execution.

### Waits

A `context.wait()` call pauses execution without consuming compute resources. This means your Lambda function is not sitting idle whilst waiting to resume. When the wait completes, Lambda invokes your function again and replays the checkpoint log, substituting stored values for completed steps.

### Determinism

Your durable function code **must be deterministic**. This is because whenever the function is replayed (after resuming from a wait or interruption) from the last completed checkpoint and does not re-execute completed steps. If your code is not deterministic, the function may produce different results than expected on replay.

<!--TODO: How to handle side-effects, like http calls -->

### Versioning

<!-- TODO: describe function versioning and fully qualified ARNs -->

## Development and testing

- Local testing
- Local development

## Understanding the execution console

<!-- TODO: Describe the execution console -->

- I/O
- Durable operations/operation detail
- Event history
