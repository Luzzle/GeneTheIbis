//! =========================================================================================
//!
//!     GENE THE IBIS© - A TWITCH BOT FOR THE TRASHCANARMY
//!     COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!     COMMANDS.JS
//!
//! =========================================================================================

const twitch = require("./twitch");
const db = require("./database");
const quotes = require("./quote");
const utils = require("./utils");
const misc = require("./misc");

exports.executeCommand = async function executeCommand(message, prefix){
    if(!message.msg.startsWith(prefix)) return "";

    if (message.msg.startsWith(prefix + "quote")) return await quotes.quoteCommand(message.msg, message.usr);
    if (message.msg.startsWith(prefix + "setprefix")) return await utils.setPrefix(message.msg, message.usr);
    if (message.msg.startsWith(prefix + "bodyslam")) return await misc.bodyslam(message.msg, message.usr['display-name']);
    if (message.msg.startsWith(prefix + "divorce")) return await misc.divorce(message.msg, message.usr['display-name']);
    if (message.msg.startsWith(prefix + "highfive")) return await misc.highfive(message.msg, message.usr['display-name']);


    switch(message.msg){

         case prefix + "pog":
             {
                 return "Poggies";
             }

        case prefix + "followers":
            {
                return await twitch.getFollowers();
            }
        
        case prefix + "followage":
            {
                return await twitch.followage(message.usr.username);
            }
        
        case prefix + "uptime":
            {
                return  await twitch.uptime();
            }
        
        case prefix + "penis":
            {
                return await misc.penis(message.usr['display-name']);
            }

        default:
            return await db.dbCommand(message.msg);

    }   
}


