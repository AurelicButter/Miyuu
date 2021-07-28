import { item } from "./interfaces/item";
import { presenceData } from "./interfaces/presenceData";

export class MiyuuAssets {
	directory: string;
	presence: presenceData;
	items: item[];

	constructor(assetDir: string) {
		this.directory = assetDir;

		try {
			this.presence = require(`${assetDir}/presence.js`);
		} catch {
			this.presence = null;
		}

		try {
			this.items = require(`${assetDir}/items.js`);
		} catch {
			this.items = null;
		}
	}

	reloadAsset(target: string): boolean {
		if (this[target] === null) {
			return true;
		}

		const modulePATH = `${this.directory}/${target}.js`;
		delete require.cache[require.resolve(modulePATH)];
		try {
			this[target] = require(modulePATH);
		} catch {
			this[target] = null;
			return false;
		}
		return true;
	}

	reloadAll(): boolean {
		let check = this.reloadAsset("presence");
		if (!check) {
			return check;
		}
		check = this.reloadAsset("items");
		return check;
	}
}
