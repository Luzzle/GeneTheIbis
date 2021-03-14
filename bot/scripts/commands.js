//! =========================================================================================
//!
//!     GENE THE IBIS© - A TWITCH BOT FOR THE TRASHCANARMY
//!     COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!     COMMANDS.JS
//!
//! =========================================================================================

const twitch = require("./twitch")

function dbCommand(cmdName){
    
}


exports.executeCommand = async function executeCommand(message){

     switch(message.msg){

         case "pog":
             {
                 return "Poggies";
             }

        case "followers":
            {
                return await twitch.getFollowers();
            }

        default:
            return "Command not found!"

    }   
}


