//! =========================================================================================
//!
//!     GENE THE IBIS© - A TWITCH BOT FOR THE TRASHCANARMY
//!     COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!     COMMANDS.JS
//!
//! =========================================================================================

const twitch = require("./twitch")
const db = require("./database")
const quotes = require("./quote")

exports.executeCommand = async function executeCommand(message, prefix){
    
    if(!message.msg.startsWith(prefix)) return "";

    if (message.msg.startsWith(prefix + "quote")) return await quotes.quoteCommand(message.msg, message.usr);

    switch(message.msg){

         case prefix + "pog":
             {
                 return "Poggies";
             }

        case prefix + "followers":
            {
                return await twitch.getFollowers();
            }

        

        default:
            return await db.dbCommand(message.msg);

    }   
}


