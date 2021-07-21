//! =========================================================================================
//!
//!     GENE THE IBIS© - A TWITCH BOT FOR THE TRASHCANARMY
//!     COPYRIGHT 2020 - 2021, CRISTIAN LUSTRI. ALL RIGHTS RESERVED
//!     MISC.JS
//!
//! =========================================================================================

const rnd = require("random-number-in-range")
const twitch = require("./twitch");

exports.penis = function penis(user){
    const broken = rnd(1, 10);
    if (broken == 6) return `${user} has a broken penis!`;
    return `${user}'s penis is ${rnd(1, 25)} inches long!`;
}

exports.bodyslam = function bodyslam(msg, usr){
    const target = msg.substr(10);
    if (!target) return "";
    if (target.toLowerCase() == usr.toLowerCase()) return "You just bodyslammed yourself into the floor... weird.";
    return `${usr} slammed ${target} into the floor!`;
}

exports.divorce = function divorce(msg, usr){
    const target = msg.substr(9);
    if (!target) return "";
    if (target.toLowerCase() == usr.toLowerCase()) return "I dont think thats how it works..";
    return `${usr} ended his prosperous marriage with ${target} over a petty fight. Seems like it wasnt destined to work out..`;
}

exports.highfive = function highfive(msg, usr){
    const target = msg.substr(10);
    if (!target) return "";
    if (target.toLowerCase() == usr.toLowerCase()) return `${usr} highfived themselves!`;
    return `${usr} and ${target} smacked their juicy, delicious hands together`;
}
