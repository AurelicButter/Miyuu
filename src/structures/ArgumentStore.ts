import { MiyuuArgument } from "./MiyuuArgument";
import { MiyuuStore } from "../classes/MiyuuStore";
import { MiyuuClient } from "../MiyuuClient";

export class ArgumentStore extends MiyuuStore {
	constructor(client: MiyuuClient) {
		super(client, "arguments", MiyuuArgument);
	}
}
