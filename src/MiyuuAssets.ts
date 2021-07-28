import { item } from "./interfaces/item";
import { presenceData } from "./interfaces/presenceData";

export class MiyuuAssets {
	presence: presenceData;
	itemData: item[];

	constructor(assetDir: string) {
		this.presence = require(`${assetDir}/presence.js`);
		this.itemData = require(`${assetDir}/items.js`);
	}
}
