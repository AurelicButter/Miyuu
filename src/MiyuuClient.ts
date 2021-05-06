import { Client } from "discord.js";

export class MiyuuClient extends Client {
    baseDirectory: string;

    constructor(options = {}) {
        super(options);

        this.baseDirectory = require.main.path;
    }

    clientTest = function() { 
        console.log("Hello world!");
        console.log(this.baseDirectory); 
    }
};