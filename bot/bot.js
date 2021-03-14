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

//? BOT SCRIPTS
const cmd = require("./scripts/commands") 
const twitch = require("./scripts/twitch")

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
}); // Initialize the bot and bind it to the channel. NOTE: NOT IN DEBUG MODE

bot.connect(); // Connect the bot

bot.once("connected", () => {
    console.log(`Connected to TheTrashCanArmy`); // Once the bot is connected, log to the console to confirm
})

//? BOT COMMANDS
bot.on("message", async (channel, user, message, self) => {

    if (self) return;

    console.log(user["display-name"] + ": " + message);

    let messageData = {
        name: user["display-name"],
        msg: message,
    }; // Create a message object and pass it through to the commands function
    
    cmd.executeCommand(messageData).then((data) => {
        bot.say(channel, data);
    })

});

