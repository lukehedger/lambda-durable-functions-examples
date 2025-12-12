import {
	type DurableContext,
	withDurableExecution,
} from "@aws/durable-execution-sdk-js";

enum StrategyType {
	A = "a",
	B = "b",
}

type StrategyInput = {
	type: StrategyType;
};

type Response = {
	status: number;
};

interface Strategy {
	execute(ctx: DurableContext): Promise<Response>;
}

class StrategyA implements Strategy {
	async execute(ctx: DurableContext): Promise<Response> {
		await ctx.runInChildContext(
			"strategy-a",
			async (_childCtx: DurableContext) => {
				return {};
			},
		);

		return {
			status: 200,
		};
	}
}

class StrategyB implements Strategy {
	async execute(ctx: DurableContext): Promise<Response> {
		await ctx.runInChildContext(
			"strategy-b",
			async (_childCtx: DurableContext) => {
				return {};
			},
		);

		return {
			status: 200,
		};
	}
}

const strategies = new Map<string, Strategy>([
	[StrategyType.A, new StrategyA()],
	[StrategyType.B, new StrategyB()],
]);

export const handler = withDurableExecution(
	async (event: StrategyInput, context: DurableContext) => {
		const strategy = strategies.get(event.type);

		if (!strategy) {
			return {
				body: `Type '${event.type}' is not supported. Valid types are: ${Object.values(StrategyType).join(", ")}`,
			};
		}

		return strategy.execute(context);
	},
);
