/**
 * Utilities for MiyuuClient
 */

import { MiyuuDate } from "./classes/MiyuuDate";
import { MiyuuOptions } from "./types/MiyuuOptions";

export class MiyuuUtil {
    date: MiyuuDate;

    constructor(options: MiyuuOptions={}) {
        this.date = new MiyuuDate(options.dateOptions);
    }

    toTitleCase (text: string) {
		return text.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
	}

	getRandom (min: number, max: number) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
}

/* Exports all needed utilities for the client. */

/*export * as dataManager from "./dataManager";
export * as speech from "./speechHelper";

exports.util = {
	presenceHelper: require("./presenceHelper"),
	modEmbed: require("./modEmbed"),
	/**
	 * Returns the best matching channel for channel messages.
	 * @param { KlasaGuild } guild - Needed to search for the channel and settings.
	 * @param { String } [args] - Defaults to "default". Takes either "default" or "mod" depending on the action needed.
	 * @returns { KlasaChannel } Returns a channel that best fits the arguements given.
	 *
	defaultChannel: (guild, args = "default") => {
		if (guild.settings.defaultChannel !== null && args === "default") {
			return guild.channels.cache.get(guild.settings.defaultChannel);
		} else if (guild.settings.modlog !== null && args === "mod") {
			return guild.channels.cache.get(guild.settings.modlog);
		}

		let name = ["general", "general-chat", "off-topic"];
		let channelID = Array.from(guild.channels.cache).filter(
			(channel) => name.includes(channel[1].name) && channel[1].type === "text"
		);
		if (channelID.length > 0) {
			return channelID[0][1];
		}

		let channels = Array.from(guild.channels.cache.sort((e1, e2) => e1.rawPosition - e2.rawPosition));
		for (let x = 0; x < channels.length; x++) {
			let currChannel = channels[x][1];
			if (
				currChannel.type === "text" &&
				currChannel.permissionsFor(guild.members.cache.get(this.client.user.id)).has("SEND_MESSAGES")
			) {
				channelID = currChannel;
				x = channels.length;
			}
		}

		return guild.channels.cache.get(channelID.id);
	},
	/**
	 * Goes over all common checks to ensure the user is able to interact with a music command
	 * @param { KlasaMessage } msg
	 * @param { String } tag - A tag for specific cases such as the join command.
	 * @returns { Boolean | Object } Returns true if passed and false if failed. If tag is not join, will return the music instance.
	 
	musicCheck: (msg, tag) => {
		if (!msg.member.voice.channelID) {
			msg.sendLocale("MUSICCHECK_USERNOVC");
			return false;
		} 
		
		if (tag !== "join") {
			let handler = msg.client.music.get(msg.guild.id);
			if (!handler) {
				msg.sendLocale("MUSICCHECK_NOQUEUE");
				return false;
			} else if (msg.member.voice.channelID !== handler.channel.id) {
				msg.sendLocale("MUSICCHECK_MISMATCHVC");
				return false;
			} else if (tag === "handler" && !handler.dispatcher) {
				msg.sendLocale("MUSICCHECK_NOHANDLER");
			}

			return handler;
		}

		return true;
	}
};*/
