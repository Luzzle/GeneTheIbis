//! =========================================================================================
//!
//!     GENE THE IBIS© - A TWITCH BOT FOR THE TRASHCANARMY
//!    COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!    TWITCH.JS
//!
//! =========================================================================================

//? NPM MODULES
const { default: axios } = require("axios");
const env = require("dotenv");

//? CONSTANTS
const CLIENT_ID = process.env.CLIENT_ID
const TCAChannelID = '402394580'


exports.getFollowers = async function getFollowers(){

    const REQ = await axios.get(`https://api.twitch.tv/kraken/channels/${TCAChannelID}`, 
        {
            headers: {
                "Client-ID": CLIENT_ID,
                "Accept": "application/vnd.twitchtv.v5+json",
            }
        });

    return REQ.data.followers.toString();
}
