import { describe, expect, it, vi } from "vitest";

const imports = vi.hoisted(() => ({ implementationLoaded: false }));

vi.mock("./ask-user-question.js", () => {
	imports.implementationLoaded = true;
	return {
		createAskUserQuestionExecutor: () => async () => ({ content: [], details: {} }),
		loadQuestionnaireSession: async () => ({ ok: true, module: {} }),
	};
});

import askUserQuestionExtension from "./index.js";

describe("extension startup", () => {
	it("registers the tool without loading its execution implementation", async () => {
		let tool: { execute: (...args: unknown[]) => Promise<unknown> } | undefined;
		const pi = {
			registerTool(value: typeof tool) {
				tool = value;
			},
			on() {},
			getActiveTools: () => ["ask_user_question"],
			setActiveTools() {},
		};

		askUserQuestionExtension(pi as never);

		expect(imports.implementationLoaded).toBe(false);
		expect(tool).toBeDefined();

		await tool!.execute("call", {}, undefined, undefined, {});
		expect(imports.implementationLoaded).toBe(true);
	});
});
