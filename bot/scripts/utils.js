//! =========================================================================================
//!
//!     GENE THE IBIS© - A TWITCH BOT FOR THE TRASHCANARMY
//!     COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!     UTILS.JS
//!
//! =========================================================================================

//? NPM MODULES
const firebase = require("firebase-admin");
const axios = require("axios").default;

exports.getPrefix = async function getPrefix(){
    return (await firebase.database().ref("prefix").get()).val();
}

exports.setPrefix = async function setPrefix(msg, usr){
    const newPrefix = msg.substr(11);
    if (!newPrefix) return "";

    if (exports.checkMod(usr)){
        
        if(newPrefix.length != 1) return "Prefix must be a single character!";
        
        firebase.database().ref("prefix").set(newPrefix);
        global.prefix = newPrefix;
        return `Prefix successfully changed to ${newPrefix}`;


    }

    return "You must be a mod to do this action!";
}

exports.checkMod = function checkMod(user){
    if (user.badges == null) return false;
    if (user.badges.broadcaster == "1" || user.mod == true){
        return true;
    }

    return false;
}

