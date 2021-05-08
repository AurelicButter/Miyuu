import { Client } from "discord.js";
import { MiyuuUtil } from "./MiyuuUtil";
import { MiyuuOptions } from "./interfaces/MiyuuOptions";
import { MiyuuData } from "./classes/MiyuuData";

export class MiyuuClient extends Client {
	baseDirectory: string;
	assetDirectory: string;
	util: MiyuuUtil;
	data: MiyuuData;

	constructor(options: MiyuuOptions = { database: { provider: "sqlite", SQLiteDirectory: "./MiyuuDB.sqlite" } }) {
		super(options);

		this.baseDirectory = require.main.path;
		this.util = new MiyuuUtil(options);
		this.data = new MiyuuData(options.database, this.assetDirectory);
		this.assetDirectory = options.assetDirectory ? options.assetDirectory : `${this.baseDirectory}\\assets`;
	}

	clientTest(): void {
		console.log("Hello world!");
		console.log(this.baseDirectory);
	}
}
