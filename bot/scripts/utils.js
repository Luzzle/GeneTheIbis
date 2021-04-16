//! =========================================================================================
//!
//!     GENE THE IBIS© - A TWITCH BOT FOR THE TRASHCANARMY
//!     COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!     UTILS.JS
//!
//! =========================================================================================

//? NPM MODULES
const firebase = require("firebase-admin");

exports.getPrefix = async function getPrefix(){
    return (await firebase.database().ref("prefix").get()).val();
}

exports.checkMod = function checkMod(user){
    if (user.badges == null) return false;
    if (user.badges.broadcaster == "1" || user.mod == true){
        return true;
    }

    return false;
}