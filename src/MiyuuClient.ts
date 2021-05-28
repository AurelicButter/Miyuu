import { Client } from "discord.js";
import { MiyuuUtil } from "./MiyuuUtil";
import { MiyuuOptions } from "./interfaces/MiyuuOptions";
import { MiyuuData } from "./classes/MiyuuData";
import { ArgumentStore } from "./structures/ArgumentStore";
import { MiyuuPermissions } from "./classes/MiyuuPermissions";

export class MiyuuClient extends Client {
	baseDirectory: string;
	assetDirectory: string;
	util: MiyuuUtil;
	data: MiyuuData;
	arguments: ArgumentStore;
	permissions: MiyuuPermissions;

	constructor(options: MiyuuOptions) {
		super(options);

		this.baseDirectory = require.main.path;
		this.util = new MiyuuUtil(options);
		this.data = new MiyuuData(this, options.database, this.assetDirectory);
		this.assetDirectory = options.assetDirectory ? options.assetDirectory : `${this.baseDirectory}\\assets`;

		this.arguments = new ArgumentStore(this);

		this.permissions = new MiyuuPermissions(options.permissionLevels);
	}

	clientTest(): void {
		console.log("Hello world!");
		console.log(this.baseDirectory);
	}
}
