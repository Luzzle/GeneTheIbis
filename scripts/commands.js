//! =========================================================================================
//!
//!     GENE THE IBIS© - A TWITCH BOT FOR THE TRASHCANARMY
//!     COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!     COMMANDS.JS
//!
//! =========================================================================================


exports.executeCommand = function executeCommand(message){

    switch(message.msg){

        case "pog":
            {
                return "Poggies";
            }

        default:
            return "Command not found!";

    }

}



