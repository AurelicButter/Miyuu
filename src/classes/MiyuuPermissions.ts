import { Collection } from "discord.js";
import MiyuuMessage from "./MiyuuMessage";

export class PermissionOptions {
	check: (message: typeof MiyuuMessage) => boolean | null; // Check permission levels
	break: boolean; // Break execution for higher levels
	fetch: boolean; // Autofetch a member or not.

	constructor(check?: (message: typeof MiyuuMessage) => boolean | null, permBreak = false, fetch = false) {
		this.check = check;
		if (!check) {
			this.check = () => {
				return null;
			};
		}
		this.break = permBreak;
		this.fetch = fetch;
	}
}

export class MiyuuPermissions extends Collection<number, PermissionOptions> {
	constructor(levels = 11) {
		super();

		for (let x = 0; x < levels; x++) {
			super.set(x, new PermissionOptions());
		}
	}

	private setItem(level: number, permission: PermissionOptions): this {
		if (level < 0) {
			throw new Error(`Permission levels start at 0. Cannot do level ${level}!`);
		}
		if (level > this.size - 1) {
			throw new Error(`Permission levels stop at ${this.size - 1}. Cannot do level ${level}!`);
		}
		return super.set(level, permission);
	}

	addCheck(level: number, check: (message: typeof MiyuuMessage) => boolean | null): this {
		return this.setItem(level, new PermissionOptions(check));
	}

	addOptions(
		level: number,
		options: {
			check: (message: typeof MiyuuMessage) => boolean | null;
			permBreak?: boolean;
			fetch?: boolean;
		}
	): this {
		return this.setItem(level, new PermissionOptions(options.check, options.permBreak, options.fetch));
	}

	add(level: number, permission: PermissionOptions): this {
		return this.setItem(level, permission);
	}

	remove(level: number): this {
		return this.setItem(level, new PermissionOptions());
	}

	async run(message: typeof MiyuuMessage, level: number): Promise<{ broke: boolean; permission: boolean }> {
		for (let x = level; x < this.size; x++) {
			const currLevel = this.get(x);
			if (currLevel.fetch && !message.member && message.guild) {
				await message.guild.members.fetch(message.author);
			}
			const currResult = await currLevel.check(message);
			if (currResult) {
				return { broke: false, permission: true };
			}
			if (currLevel.break) {
				return { broke: true, permission: false };
			}
		}
		return { broke: false, permission: false };
	}
}
