import { MiyuuPiece } from "../classes/MiyuuPiece";

export class MiyuuLanguage extends MiyuuPiece {
	language: {
		[key: string]: string | ((args?: unknown[]) => string);
	};

	/**
	 * Get language strings
	 * @param term The key to lookup in the language object
	 * @param args Any additional arguments for the message.
	 */
	get(term: string, ...args: unknown[]): string | ((args?: unknown[]) => string) {
		if (!this.enabled) {
			throw new Error("Language specified is disabled!");
		}
		const value = this.language[term];

		if (!value) {
			return null;
		}
		if (typeof value === "function") {
			return value(args);
		}
		return value;
	}
}
