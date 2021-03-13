//! =========================================================================================
//!
//!     GENE THE IBIS© - A TWITCH BOT FOR THE TRASHCANARMY
//!     COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!     BOT.JS
//!
//! =========================================================================================

//? NPM MODULES
const tmi = require("tmi.js");
const axios = require("axios");
const env = require("dotenv").config({path: "keys.env"});

//? BOT SCRIPTS
const cmd = require("./scripts/commands.js")

//? CONSTANTS
const VARS = process.env;

//? BOT INIT
const bot = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: "GeneTheIbis",
        password: VARS.BOT_OAUTH_TOKEN
    },
    channels: ["LuzzLuz"]
});

bot.connect();

bot.once("connected", () => {
    console.log("Connected to TheTrashCanArmy");
})

//? BOT COMMANDS
bot.on("message", (channel, user, message, self) => {

    if (self) return;

    console.log(user["display-name"] + ": " + message);

    let messageData = {
        name: user["display-name"],
        msg: message,
    };

    bot.say(channel, cmd.executeCommand(messageData));

})

