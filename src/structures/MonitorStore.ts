import { MiyuuStore } from "../classes/MiyuuStore";
import { MiyuuMonitor } from "./MiyuuMonitor";
import { MiyuuClient } from "../MiyuuClient";
import MiyuuMessage from "../classes/MiyuuMessage";

export class MonitorStore extends MiyuuStore {
	constructor(client: MiyuuClient) {
		super(client, "monitor", MiyuuMonitor);
	}

	run(message: MiyuuMessage): void {
		const myMonitors = this.values();
		let currMonitor: MiyuuMonitor = myMonitors.next().value;
		while (currMonitor !== null) {
			if (currMonitor.isEnabled(message)) {
				currMonitor.runMonitor(message);
			}
			currMonitor = myMonitors.next().value;
		}
	}
}
