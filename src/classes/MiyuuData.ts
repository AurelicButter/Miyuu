import { MiyuuDB, MiyuuDBOptions } from "../interfaces/MiyuuDB";
import { join } from "path";
import { existsSync } from "fs";
import { dataSchema, defaultSchema } from "../interfaces/dataSchema";
import { MiyuuClient } from "../MiyuuClient";

export class MiyuuData implements MiyuuDB {
	client: MiyuuClient;
	db: MiyuuDB;
	assetDirectory: string;

	constructor(
		client: MiyuuClient,
		options: MiyuuDBOptions,
		assetDirectory: string,
		dataSchema: dataSchema = new defaultSchema()
	) {
		let dbPath = join(__dirname, "/plugins/", options.provider + ".js");
		if (!existsSync(dbPath)) {
			dbPath = join(assetDirectory, "/plugins/", options.provider + ".js");
		}

		if (!existsSync(dbPath)) {
			this.db = null;
			throw new Error(`Database plugin ${options.provider} does not exist!`);
		}

		this.client = client;
		this.db = new (require(dbPath))(options, dataSchema);
	}

	async initialize(): Promise<void> {
		return await this.db.initialize();
	}

	async add(userID: string, credits: number): Promise<boolean> {
		const added = await this.db.add(userID, credits);

		if (!added) {
			console.log("ERROR: This user already exists in the database");
		}
		return added;
	}

	async get(collection: string, userID: string): Promise<unknown> {
		let collected = await this.db.get(collection, userID);

		if (collected === false) {
			console.log("ERROR: Collection not found.");
			collected = null;
		}

		return collected;
	}

	async update(collection: string, userID: string, key: string, value: unknown): Promise<boolean> {
		const updated = await this.db.update(collection, userID, key, value);

		if (!updated) {
			console.log("ERROR: Collection not found.");
		}
		return updated;
	}

	async delete(userID: string): Promise<boolean> {
		const deleted = await this.db.delete(userID);

		if (!deleted) {
			console.log("ERROR: This user doesn't exist in the database");
		}
		return deleted;
	}

	async export(): Promise<unknown> {
		try {
			return await this.db.export();
		} catch (error) {
			console.log(error);
			console.log("ERROR: Failed to export data out of the database.");
			return;
		}
	}

	async import(data: unknown): Promise<boolean> {
		try {
			await this.db.import(data);
			return true;
		} catch (error) {
			console.log(error);
			console.log("ERROR: Failed to import the data into the database.");
			return false;
		}
	}
}
