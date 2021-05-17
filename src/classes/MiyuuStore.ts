import { Collection } from "discord.js";
import { PieceTypes } from "../consts/PieceTypes";
import { MiyuuClient } from "../MiyuuClient";
import { MiyuuPiece, MiyuuPieceOptions } from "./MiyuuPiece";
import { findFiles } from "../utilities/findFiles";
import { join, relative, sep } from "path";

export class MiyuuStore extends Collection<string, MiyuuPiece> {
	client: MiyuuClient;
	name: string;
	value: typeof MiyuuPiece;
	pieceDir: string;
	pieces: Set<MiyuuPiece> = new Set<MiyuuPiece>();
	aliases: Collection<string, MiyuuPiece> = new Collection();

	constructor(client: MiyuuClient, name: string, value: typeof MiyuuPiece) {
		super();
		this.client = client;
		this.name = name;
		this.value = value;

		this.pieceDir = `${this.client.baseDirectory}\\${name}`;
	}

	init(): Promise<void[]> {
		return Promise.all(this.map((piece) => piece.enabled ? piece.init() : piece.unload()));
	}

	get(name: string): MiyuuPiece {
		return this.get(name) || this.aliases.get(name);
	}

	has(name: string): boolean {
		return this.has(name) || this.aliases.has(name);
	}

	findPiece(name: MiyuuPiece | string): MiyuuPiece {
		if (typeof name !== "string") {
			return name;
		}
		return this.get(name);
	}

	load(directory: string, file: string[], options?: MiyuuPieceOptions): MiyuuPiece {
		const pieceLocation = join(directory, ...file);
		let piece = null;
		try {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const Piece = require(pieceLocation);
			if (!this.pieceCheck(Piece)) {
				throw new TypeError("Input piece is not the correct type.");
			}
			piece = this.add(new MiyuuPiece(this, file, directory, options));
		} catch (error) {
			console.error(`Failed to load piece at ${pieceLocation}`);
		}
		delete require.cache[pieceLocation];
		module.children.pop();
		return piece;
	}

	async loadAll(): Promise<number> {
		this.clear();
		const files = await findFiles(this.pieceDir);
		if (!files) {
			return 0;
		}

		await Promise.all(
			[...files.keys()].map((file) => {
				this.load(this.pieceDir, relative(this.pieceDir, file).split(sep));
			})
		);

		return this.size;
	}

	private pieceCheck(piece: MiyuuPiece): boolean {
		if (typeof piece !== "object") {
			return false;
		}
		return PieceTypes[this.name] === piece.name;
	}

	add(piece: MiyuuPiece): MiyuuPiece {
		if (!this.pieceCheck(piece)) {
			throw new TypeError(`Only ${this.name} may be stored in this store.`);
		}
		const isLoaded = this.get(piece.name);
		if (isLoaded) {
			this.delete(isLoaded);
		}

		isLoaded.aliases.forEach((alias) => {
			this.aliases.set(alias, isLoaded);
		});

		super.set(piece.name, piece);
		return piece;
	}

	delete(name: MiyuuPiece | string): boolean {
		const targetPiece = this.findPiece(name);
		if (!targetPiece) {
			return false;
		}
		targetPiece.aliases.forEach((alias) => this.aliases.delete(alias));
		super.delete(targetPiece.name);
		return true;
	}

	clear(): void {
		super.clear();
		this.aliases.clear();
	}

	toString(): string {
		return this.name;
	}
}
