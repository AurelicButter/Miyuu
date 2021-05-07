import { ClientOptions } from "discord.js";
import { DateOptions } from "../classes/MiyuuDate";

export interface MiyuuOptions extends ClientOptions {
    assetDirectory?: string;
    dateOptions?: DateOptions;
}