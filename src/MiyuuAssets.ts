import { presenceData } from "./interfaces/presenceData";

export class MiyuuAssets {
	presence: presenceData;

	constructor(assetDir: string) {
		this.presence = require(`${assetDir}/presence.js`);
	}
}
