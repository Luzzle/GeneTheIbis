//! =========================================================================================
//!
//!     GENE THE IBIS © - A TWITCH BOT FOR THE TRASHCANARMY
//!     COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!     BOT.JS
//!
//! =========================================================================================

//? NPM MODULES
const tmi = require("tmi.js");
const axios = require("axios");
const env = require("dotenv").config({path: "keys.env"});
const firebase = require("firebase-admin");

//? BOT SCRIPTS
const cmd = require("./scripts/commands");
const utils = require("./scripts/utils");

//? CONSTANTS AND VARIABLES
const VARS = process.env;
const ADMINKEY = require("./scripts/admin_key.json");
let prefix = "";


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
}); // Initialize the bot and bind it to the channel. NOTE: NOT IN DEBUG MODE

bot.connect(); // Connect the bot

bot.once("connected", async () => {
    utils.getPrefix().then(data => {
        prefix = data;
        console.log(`Connected to TheTrashCanArmy`); // Once the bot is connected, log to the console to confirm
    })
})

//? BOT COMMANDS
bot.on("message", async (channel, user, message, self) => {

    if (self) return;

    console.log(user["display-name"] + ": " + message);

    let messageData = {
        usr: user,
        msg: message,
    }; // Create a message object and pass it through to the commands function
    
    cmd.executeCommand(messageData, prefix).then((data) => {
        bot.say(channel, data);
    })

});

