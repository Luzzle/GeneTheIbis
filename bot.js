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
    channels: ["TheTrashCanArmy"]
});

bot.connect();

bot.once("connected", () => {
    console.log("Connected to TheTrashCanArmy");
})

//? BOT COMMANDS
bot.on("message", (channel, user, message, self) => {
    console.log(message);
})
