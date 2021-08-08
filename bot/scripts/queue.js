//! =========================================================================================
//!
//!     GENE THE IBIS© - A TWITCH BOT FOR THE TRASHCANARMY
//!     COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!     QUEUE.JS
//!
//! =========================================================================================

const utils = require("./utils");

let queue = []

exports.queueCommand = function queueCommand(msg, usr){
    const cmd = msg.split(" ")[1];

    if (cmd == "join") {

        if (queue.includes(usr['display-name'])) return `${usr['display-name']} is already in the queue!`;

        queue.push(usr['display-name']);
        return `${usr['display-name']} successfully joined the queue!`;
    }

    if (cmd == "pop"){
        if (!utils.checkMod(usr)) return "You must be a mod to use this command!";
        
        if (queue.length == 0) return "The queue is currently empty.";

        let element = queue[0];
        queue.shift();

        return `Popped ${element} from the queue!`;
        
    }

    if (msg.split(" ").length == 1) {
        if (queue.length == 0) return "The queue is currently empty.";

        let string = "Queue: ";
        let i = 0;

        queue.forEach(element => {
            i++;
            (i == queue.length) ? string += element + "." : string += element + ", ";
        })

       return string;
    };

    return "Command Not Found!"
}