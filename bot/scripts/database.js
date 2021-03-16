//! =========================================================================================
//!
//!     GENE THE IBIS© - A TWITCH BOT FOR THE TRASHCANARMY
//!     COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!     DATABASE.JS
//!
//! =========================================================================================


//? NPM MODULES
const firebase = require("firebase-admin");
const env = require("dotenv").config({path: "keys.env"});

//? CONSTANTS
const dbURL = process.env.DATABASE_URL

//? FIREBASE INIT
const key = require("./admin_key.json");

firebase.initializeApp({
    credential: firebase.credential.cert(key),
    databaseURL: dbURL,
});

exports.dbCommand = async function dbCommand(commandName){
    const cmd = await firebase.database().ref(`Commands/${commandName}`).get();
    if (cmd.val()) return cmd.val();
    return "Command Not Found!"
}
