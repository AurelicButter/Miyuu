import { PresenceStatusData } from "discord.js";
import { presenceData } from "../interfaces/presenceData";
import { MiyuuClient } from "../MiyuuClient";

let presenceList: presenceData;
const tList = ["play", "stream", "listen", "watch"];

function Presence(client: MiyuuClient, type: string, name: string, status: PresenceStatusData) {
	const myType = tList.indexOf(type);
	name = name !== "-null" ? `${client.globalPrefix}help | ${name}` : null;

	client.user.setPresence({ activity: { name: name, type: myType }, status });
}

function determineStatus(previous?: string): string[] {
	let items: string[];
	if (previous) {
		do {
			items = presenceList[Math.floor(Math.random() * presenceList.length)];
		} while (items[0] === previous);
		return items;
	}

	return presenceList[Math.floor(Math.random() * presenceList.length)];
}

export function presenceHelper(
	client: MiyuuClient,
	name: string,
	type = "play",
	status: PresenceStatusData = "online"
): void {
	const sliceCheck = `${client.globalPrefix}help |`.length;
	presenceList = client.assets.presence;

	if (presenceList === null) {
		presenceList = [["Listing for commands", "play"]];
	}

	if (name === "-start" || name === "-reset" || name === null) {
		let newStatus = determineStatus();
		Presence(client, newStatus[1], newStatus[0], "online");
		client.timer = setInterval(function () {
			let presenceStatus = null;
			if (client.user.presence.activities[0].name !== null) {
				presenceStatus = client.user.presence.activities[0].name.slice(sliceCheck);
			}

			newStatus = determineStatus(presenceStatus);
			Presence(client, newStatus[1], newStatus[0], status);
		}, 900000);
		return;
	}

	Presence(client, type, name, status);
	clearInterval(client.timer);
}
