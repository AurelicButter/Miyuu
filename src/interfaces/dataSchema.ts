export interface dataSchema {
	dbStructure: dbStructure;
	input: input;
}

export interface dbStructure {
	[key: string]: {
		[key: string]: string | schemaOptions;
	};
}

export interface input {
	[key: string]: {
		[key: string]: string;
	};
}

export interface schemaOptions {
	type: "string" | "number";
	default?: number;
	primary?: boolean;
}
