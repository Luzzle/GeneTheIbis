//! =========================================================================================
//!
//!     GENE THE IBIS© - A TWITCH BOT FOR THE TRASHCANARMY
//!     COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!     QUOTES.JS
//!
//! =========================================================================================

const database = require("firebase-admin").database();
const random = require("random-number-in-range");
const utils = require("./utils");

exports.quoteCommand = async function quoteCommand(message, user){
    const quote = message.substr(7);
    console.log(user);
    if (quote.startsWith("add ")){

        if (utils.checkMod(user)){
            let quoteToAdd = quote.substr(4);
            let totalQuotes = (await database.ref("Quotes/totalQuotes").get()).val();
            totalQuotes++;
    
            database.ref(`Quotes/${totalQuotes}`).set(quoteToAdd);
            database.ref("Quotes/totalQuotes").set(totalQuotes);
            return `Quote ${totalQuotes} Successfully Added!`;
        }
        return "User must be a mod to do this action!";
    }

    if (!quote) {
        const quoteMax = await database.ref("Quotes/totalQuotes").get();
        const rnd = random(1, quoteMax.val());
        const randomQuote = await database.ref(`Quotes/${rnd}`).get();
        return `${rnd}: ${randomQuote.val()}`;
    }

    if (parseInt(quote)){
        const quoteVal = await database.ref(`Quotes/${quote}`).get();
        if (quoteVal.val()) return `${quote}: ${quoteVal.val()}`;
        return "Invalid Quote!"
    }
    return "Invalid Quote";
}
