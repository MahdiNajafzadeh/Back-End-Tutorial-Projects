interface ErrorSchemaInput {
	from: string | "unknown";
	message: string | "unknown";
	info?: any | {};
}

export { type ErrorSchemaInput };

export default {
	INTERNAL(errorSchemaInput: ErrorSchemaInput) {
		return {
			success: false,
			code: "INTERNAL",
			statusCode: 500,
			details: errorSchemaInput,
		};
	},
	BAD_REQUEST(errorSchemaInput: ErrorSchemaInput) {
		return {
			success: false,
			code: "BAD_REQUEST",
			statusCode: 400,
			details: errorSchemaInput,
		};
	},
	NOT_FOUND(errorSchemaInput: ErrorSchemaInput) {
		return {
			success: false,
			code: "NOT_FOUND",
			statusCode: 404,
			details: errorSchemaInput,
		};
	},
};
