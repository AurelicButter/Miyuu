import { Client, ClientApplication } from "discord.js";
import { MiyuuUtil } from "./MiyuuUtil";
import { MiyuuOptions } from "./interfaces/MiyuuOptions";
import { MiyuuData } from "./classes/MiyuuData";
import { ArgumentStore } from "./structures/ArgumentStore";
import { MiyuuPermissions } from "./classes/MiyuuPermissions";
import { LanguageStore } from "./structures/LanguageStore";
import { MonitorStore } from "./structures/MonitorStore";
import { MiyuuAssets } from "./MiyuuAssets";

export class MiyuuClient extends Client {
	application: ClientApplication = null;
	arguments: ArgumentStore;
	assetDirectory: string;
	baseDirectory: string;
	util: MiyuuUtil;
	data: MiyuuData;
	language: LanguageStore;
	monitors: MonitorStore;
	permissions: MiyuuPermissions;
	timer: NodeJS.Timeout;
	assets: MiyuuAssets;
	globalPrefix: string;

	constructor(options: MiyuuOptions) {
		super(options);

		this.baseDirectory = require.main.path;
		this.util = new MiyuuUtil(options);
		this.data = new MiyuuData(this, options.database, this.assetDirectory);
		this.assetDirectory = options.assetDirectory ? options.assetDirectory : `${this.baseDirectory}\\assets`;
		this.globalPrefix = options.globalPrefix;

		this.arguments = new ArgumentStore(this);
		this.language = new LanguageStore(this);
		this.monitors = new MonitorStore(this);

		this.permissions = new MiyuuPermissions(options.permissionLevels);

		this.assets = new MiyuuAssets(this.assetDirectory);
	}

	/**
	 * An extended login function that initialized parts of the Miyuu
	 * framework after login.
	 *
	 * @param token Discord bot's token for login
	 */
	async login(token?: string): Promise<string> {
		const myString = super.login(token);

		await this.getApplication();

		return myString;
	}

	/**
	 * Fetch and set the client's application.
	 */
	async getApplication(): Promise<ClientApplication> {
		this.application = await super.fetchApplication();
		return this.application;
	}

	clientTest(): void {
		console.log("Hello world!");
		console.log(this.baseDirectory);
	}
}
