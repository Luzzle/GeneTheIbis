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

    return `TheTrashCanArmy has ${REQ.data.followers.toString()} followers!`;
}

exports.followage = async function followage(user){
    const REQ = await axios.get(`https://api.2g.be/twitch/followage/TheTrashCanArmy/${user}?format=mwdhms`);
    return REQ.data;
}

exports.uptime = async function uptime(){
    const REQ = await axios.get("https://beta.decapi.me/twitch/uptime/TheTrashCanArmy");
    
    if (REQ.data == "TheTrashCanArmy is offline") return REQ.data;
    return "TheTrashCanArmy has been live for: " + REQ.data;
}

exports.getProfile = async function getProfile(usr){
    const REQ = await axios.get(`https://api.twitch.tv/kraken/users?login=${usr}`, {
        headers: {
            "Client-ID": CLIENT_ID,
            "Accept": "application/vnd.twitchtv.v5+json",
        }
    });

    return REQ.data;
}

exports.getChannel = async function getChannel(id){
    const REQ = await axios.get(`https://api.twitch.tv/kraken/channels/${id}`, {
        headers: {
            "Client-ID": CLIENT_ID,
            "Accept": "application/vnd.twitchtv.v5+json",
        }
    });
    return REQ.data;
}

exports.shoutout = async function shoutout(usr){
    const user = usr.substring(4);

    const profile = await exports.getProfile(user);
    
    if (profile._total == 0) return "Channel not found!";
    
    const id = profile.users[0]._id;
    

    const channel = await exports.getChannel(id);


    return `${channel.display_name} was last seen playing ${channel.game} - Give ${channel.display_name} a follow at https://twitch.tv/${channel.name}`;

}