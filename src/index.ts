const { Client } = require("discord.js");

class MiyuuClient extends Client {
    constructor(options = {}) {
        super(options);

        this.baseDirectory = process.mainModule.path;
    }

    clientTest = function() { 
        console.log("Hello world!");
        console.log(this.baseDirectory); 
    }
};

module.exports = MiyuuClient;