import { MiyuuStore } from "../classes/MiyuuStore";
import { MiyuuClient } from "../MiyuuClient";
import { MiyuuLanguage } from "./MiyuuLanguage";

export class LanguageStore extends MiyuuStore {
	constructor(client: MiyuuClient) {
		super(client, "language", MiyuuLanguage);
	}
}
