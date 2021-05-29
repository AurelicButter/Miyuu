import { MiyuuPiece, MiyuuPieceOptions } from "../classes/MiyuuPiece";
import { MonitorStore } from "./MonitorStore";
import MiyuuMessage from "../classes/MiyuuMessage";

export interface MonitorOptions extends MiyuuPieceOptions {
	ignoreBots?: boolean;
	ignoreSelf?: boolean;
	ignoreOthers?: boolean;
	ignoreWebhooks?: boolean;
	ignoreEdits?: boolean;
	ignoreBlacklistUser?: boolean;
	ignoreBlacklistGuild?: boolean;
}

export class MiyuuMonitor extends MiyuuPiece {
	ignoreBots = true;
	ignoreSelf = true;
	ignoreOthers = true;
	ignoreWebhooks = true;
	ignoreEdits = true;
	ignoreBlacklistUser = true;
	ignoreBlacklistGuild = true;

	constructor(store: MonitorStore, file: string[], directory: string, options: MonitorOptions) {
		super(store, file, directory, options);

		Object.keys(options).forEach((key) => {
			if (["name", "enabled", "aliases"].includes(key)) {
				return;
			}
			this[key] = options[key];
		});
	}

	/**
	 * Private method to run the current monitor.
	 * @param message Message to test
	 */
	async runMonitor(message: typeof MiyuuMessage): Promise<void> {
		try {
			await this.run(message);
		} catch (err) {
			console.error(`Monitor ${this.name} errored: \n${err}`);
		}
	}

	/**
	 * Check if the monitor is allowed to run for this message
	 * @param message Message to test
	 */
	isEnabled(message: typeof MiyuuMessage): boolean {
		return (
			this.enabled &&
			!(this.ignoreBots && message.author.bot) &&
			!(this.ignoreSelf && this.client.user === message.author) &&
			!(this.ignoreOthers && this.client.user !== message.author) &&
			!(this.ignoreWebhooks && message.webhookID) &&
			!(this.ignoreEdits && message._edits.length)
		);

		// Implement ignore blacklist users/guild when client settings are implemented.
	}

	// For implementation in extended classes.
	run(message: typeof MiyuuMessage): void {
		throw new Error(`Run method not implemented for ${this.name}`);
	}

	toJSON(): {
		directory: string;
		file: string;
		path: string;
		name: string;
		enabled: boolean;
		aliases: string[];
		ignoreBots: boolean;
		ignoreSelf: boolean;
		ignoreOthers: boolean;
		ignoreWebhooks: boolean;
		ignoreEdits: boolean;
		ignoreBlacklistUser: boolean;
		ignoreBlacklistGuild: boolean;
	} {
		return {
			...super.toJSON(),
			ignoreBots: this.ignoreBots,
			ignoreSelf: this.ignoreSelf,
			ignoreOthers: this.ignoreOthers,
			ignoreWebhooks: this.ignoreWebhooks,
			ignoreEdits: this.ignoreEdits,
			ignoreBlacklistUser: this.ignoreBlacklistUser,
			ignoreBlacklistGuild: this.ignoreBlacklistGuild
		};
	}
}
