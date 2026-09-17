export const MAX_QUESTIONS = 4;
export const MIN_OPTIONS = 2;
export const MAX_OPTIONS = 4;
export const MAX_HEADER_LENGTH = 16;
export const MAX_LABEL_LENGTH = 60;

export const OptionSchema = {
	type: "object",
	required: ["label", "description"],
	properties: {
		label: {
			type: "string",
			maxLength: MAX_LABEL_LENGTH,
			description: `MAX ${MAX_LABEL_LENGTH} CHARACTERS — hard limit, requests over the limit are rejected. The display text for this option that the user will see and select. Should be concise (1-5 words) and clearly describe the choice.`,
		},
		description: {
			type: "string",
			description:
				"Explanation of what this option means or what will happen if chosen. Useful for providing context about trade-offs or implications.",
		},
		preview: {
			type: "string",
			description:
				"Optional preview content rendered when this option is focused. Use for mockups, code snippets, or visual comparisons that help users compare options. See the tool description for the expected content format.",
		},
	},
} as const;

export const QuestionSchema = {
	type: "object",
	required: ["question", "header", "options"],
	properties: {
		question: {
			type: "string",
			description:
				'The complete question to ask the user. Should be clear, specific, and end with a question mark. Example: "Which library should we use for date formatting?" If multiSelect is true, phrase it accordingly, e.g. "Which features do you want to enable?"',
		},
		header: {
			type: "string",
			maxLength: MAX_HEADER_LENGTH,
			description: `MAX ${MAX_HEADER_LENGTH} CHARACTERS — hard limit, requests over the limit are rejected. Very short chip/tag shown next to the question. Examples: "Auth method", "Library", "Approach".`,
		},
		options: {
			type: "array",
			items: OptionSchema,
			minItems: MIN_OPTIONS,
			maxItems: MAX_OPTIONS,
			description:
				"The available choices for this question. Must have 2-4 options. Each option should be a distinct, mutually exclusive choice (unless multiSelect is enabled). The 'Type something.' row is appended automatically — do NOT author it.",
		},
		multiSelect: {
			type: "boolean",
			default: false,
			description:
				"Set to true to allow the user to select multiple options instead of just one. Use when choices are not mutually exclusive.",
		},
	},
} as const;

export const QuestionsSchema = {
	type: "array",
	items: QuestionSchema,
	minItems: 1,
	maxItems: MAX_QUESTIONS,
	description: "Questions to ask the user (1-4 questions)",
} as const;

export const QuestionParamsSchema = {
	type: "object",
	required: ["questions"],
	properties: { questions: QuestionsSchema },
} as const;
