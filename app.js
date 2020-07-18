// GeneTheIbis - A Twitch Bot
// Developed by Cristian Lustri
// Copyright Cristian Lustri 2020 (All Rights Reserved)
// This version developed 6/07/2020
//
// Official Command List
// '!followers' - List channel followers
// 'Custom Commands' - Connected to Firebase RealTime Database
// 'Quotes' - Connected to Firebase RealTime Database
// 'Timed Commands' - Thanks the mods - 50hr, Socials - 30mins, Sponsor - 45mins
// 'Socials' - Linktree
// '!followage' - Followage of the user


// Node modules & constants
const admin = require('firebase-admin');
const tmi = require('tmi.js')
const dot = require('dotenv')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const options = require('./options')
const https = require('follow-redirects').https
const client = new tmi.client(options)
const tcaChannelID = '402394580'
const random = require('random-number-in-range')

dot.config({path: "variables.env"})

const CLIENT_ID = process.env['CLIENT_ID']
const DB_URL = process.env['DB_URL']


// Arrays
var queue = []
var serviceAccount = require("./dontlookhere.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: DB_URL
  });

var database = admin.database();

// API Request Functions
async function getChannelInfo(){
    
    var options = {
        'method': 'GET',
        'hostname': 'api.twitch.tv',
        'path': `/kraken/channels/${tcaChannelID}`,
        'headers': {
            'Client-ID': `${CLIENT_ID}`,
            'Accept': 'application/vnd.twitchtv.v5+json'
        },
        'maxRedirects': 20
    };

    return new Promise(function(resolve, reject){
        var req = https.request(options, function(res){
            var chunks = []

            res.on('data', function(chunk){
                chunks.push(chunk)
            })

            res.on('end', function(chunk){
                var body = Buffer.concat(chunks)
                var obj = JSON.parse(body)
                resolve(obj)
            })

            res.on('error', function(err){
                console.log(err)
            })
        })
        req.end();
    })
}

function followage(user){
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', `https://api.2g.be/twitch/followage/TheTrashCanArmy/${user}?format=mwdhms`, false)
    xmlHttp.send(null)
    return xmlHttp.responseText
}

//Bot Commands Below
client.connect();
client.setMaxListeners(20)


client.on('chat', (channel, userstate, message, self) => {
    if(self) return

    //Followers
    if(message.toLowerCase() === "!followers"){
        getChannelInfo().then((data) => {
            client.say(channel, `TheTrashCanArmy currently has ${data.followers} followers!`)
        })
    }

    //Socials
    if(message.toLowerCase() === "!socials"){
        client.say(channel, `https://linktr.ee/trashcanarmy`)
    }

    //Discord
    if(message.toLowerCase() === "!discord"){
        client.say(channel, `Join the Discord at https://linktr.ee/trashcanarmy!`)
    }

    //Sponsor
    if(message.toLowerCase() === "!sponsor"){
        client.say(channel, `These Sexy possums are sponsered by non other than The Lonely Kids Club! To check out these awesome clothes use this link! https://linktr.ee/trashcanarmy Dont forget to use the 'TrashCanArmy' discount code at checkout for 10% Off!`)
    }

    //Join Queue
    if(message.toLowerCase() === "!merch"){
        client.say(channel, `Get yourself some trashy threads at https://linktr.ee/trashcanarmy Rep the army you stunning wombats ❤`)
    }

    //! Queue System Below
    
    //Joinqueue
    if(message.toLowerCase() === "!joinqueue"){
        queue[queue.length] = ` ${userstate['display-name']}`
        client.say(channel, `@${userstate['display-name']} has been added to queue!`)
    }

    if (message.toLowerCase() === '!queue'){
        if (queue.length == 0){
            client.say(channel, 'Queue is empty!')
        }else{
            client.say(channel, `Queue: ${queue.toString()}`)
        }
    }

    if (message.toLowerCase() === '!popqueue'){
        if (userstate.mod == false){
            client.say(channel, 'You must be a mod to use this command!')
        }else{
            client.say(channel, `${queue[0]} has been removed from the queue!`)
            queue.shift()
        }
    }


    if(message === "!followage"){
        client.say(channel, followage(userstate['display-name']))
    }
})


//!Custom Commands Below

client.on('chat', (channel, userstate, message, self) => {

    database.ref('Commands').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if(message === childSnapshot.key){
                client.say(channel, childSnapshot.val())
            }
        })
    })
})

client.on('chat', (channel, userstate, message, self) => {
    if (self) return
    
    if (message.startsWith('!addcommand', 0)){
        if (userstate.mod == false){
            client.say(channel, "You must be a mod to use this command!")
        }else{
            var customName = message.split(" ")[1]
            if (customName == undefined){
                client.say(channel, 'Please enter a command and a response!') 
                return
            }
            var customResponse = message.substring((12 + customName.length + 1))
         
            if (customResponse === ""){
                client.say(channel, "Please enter a response")
                return
            }
            database.ref(`Commands/!${customName}`).set(customResponse)

            client.say(channel, "Command Successfully Added!")
        }
    }

    if (message.startsWith("!deletecommand")){
        var command = message.substring(15)
        if (userstate.mod == false){
            client.say(channel, "You must be a mod to use this command!")
        }else{
            database.ref(`Commands/!${command}`).remove().then(function(){
                client.say(channel, "Command successfully deleted!")
            })
        }
    }
})


//!Queue System Below

client.on('chat', (channel, userstate, message, self) => {
    if (self) return

    if (message.startsWith("!addquote")){
        
        if (userstate.mod == false){
            client.say(channel, "You must be a mod to use this command!")
        }else{
            var quote = message.substring(10)
        
            database.ref('totalQuotes').once('value', function(snapshot){
                database.ref(`Quotes/${snapshot.val() + 1}`).set(quote)
                database.ref('totalQuotes').set(snapshot.val() + 1)
                client.say(channel, 'Quote added successfully!')
            })
        }
    }

    if (message.startsWith('!quote')){
        var number = message.substring(7);
        
        if (number == ""){
            database.ref('totalQuotes').once('value', function(snapshot){
                var max = snapshot.val() + 1
                var randomQuote = random(1, max)
                
                database.ref(`Quotes/${randomQuote}`).once('value', function(snapshot){
                    client.say(channel, `${randomQuote}: ${snapshot.val()}`)
                })
            })
        }else{
            database.ref(`Quotes/${number}`).once('value', function(snapshot){
                if(snapshot.val() == null){
                    client.say(channel, `Quote does not exist!`)
                }else{
                    client.say(channel, `${snapshot.key}: ${snapshot.val()}`)
                }
            })
        }
    }

    if (message.startsWith('!so')){
        
    }
})



setInterval(() => {
    client.say('TheTrashCanArmy', 'Dont forget to thank the Mods! Heart emotes in chat!')
}, 1000 * 60 * 50)

setInterval(() => {
    client.say('TheTrashCanArmy', 'Check out our socials at https://linktr.ee/trashcanarmy')
}, 1000 * 60 * 30)

setInterval(() => {
    client.say('TheTrashCanArmy', `These Sexy possums are sponsered by not other than The Lonely Kids Club! To check out these awesome clothes use this link! https://linktr.ee/trashcanarmy Dont forget to use the 'TrashCanArmy' discount code at checkout for 10% Off!`)
}, 1000 * 60 * 45)
