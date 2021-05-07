import { Client } from "discord.js";
import { MiyuuUtil } from "./MiyuuUtil";
import { MiyuuOptions } from "./types/MiyuuOptions";

export class MiyuuClient extends Client {
    baseDirectory: string;
    assetDirectory: string;
    util: MiyuuUtil;

    constructor(options: MiyuuOptions = {}) {
        super(options);

        this.baseDirectory = require.main.path;
        this.util = new MiyuuUtil(options);
        this.assetDirectory = options.assetDirectory ? options.assetDirectory : `${this.baseDirectory}\\assets`;
    }

    clientTest() { 
        console.log("Hello world!");
        console.log(this.baseDirectory); 
    }
};