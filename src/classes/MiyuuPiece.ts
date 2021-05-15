import { MiyuuClient } from "../MiyuuClient";
import { MiyuuStore } from "./MiyuuStore";

export interface MiyuuPieceOptions {
	name: string;
	enabled?: boolean;
	aliases?: string[];
}

export class MiyuuPiece implements MiyuuPieceOptions {
	client: MiyuuClient;
	file: string[]; // File name
	directory: string; // Where piece is stored
	name: string;
	enabled = true;
	store: MiyuuStore;
	aliases: string[];

	constructor(store: MiyuuStore, file: string[], directory: string, options: MiyuuPieceOptions) {
		this.client = store.client;
		this.file = file;
		this.directory = directory;
		this.name = options.name || file[file.length - 1].slice(0, -3);
		this.store = store;

		if (options.enabled !== null) {
			this.enabled = options.enabled;
		}
		this.aliases = options.aliases ? options.aliases : [];
	}

	async init(): Promise<void> {
		// For optional implementation for child classes.
	}

	get pieceType(): string {
		return this.store.name;
	}

	get path(): string {
		return `${this.directory}/${this.file}`;
	}

	async reload(): Promise<MiyuuPiece> {
		const piece = this.store.load(this.directory, this.file);
		if (piece) {
			await piece.init();
			return piece;
		}
	}

	unload(): void {
		this.store.delete(this);
		return;
	}

	toggle(): this {
		this.enabled = !this.enabled;
		return this;
	}

	toString(): string {
		return this.name;
	}

	toJSON(): { directory: string; file: string; path: string; name: string; enabled: boolean; aliases: string[] } {
		return {
			directory: this.directory,
			file: this.file.join("\\"),
			path: this.path,
			name: this.name,
			enabled: this.enabled,
			aliases: this.aliases
		};
	}
}
