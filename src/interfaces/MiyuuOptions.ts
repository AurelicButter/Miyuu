import { ClientOptions } from "discord.js";
import { DateOptions } from "../classes/MiyuuDate";
import { MiyuuDBOptions } from "../interfaces/MiyuuDB";

export interface MiyuuOptions extends ClientOptions {
	assetDirectory?: string;
	dateOptions?: DateOptions;
	database: MiyuuDBOptions;
	permissionLevels?: number;
}
