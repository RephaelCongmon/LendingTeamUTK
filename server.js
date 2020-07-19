const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const parse = require("pg-connection-string");
const { Pool } = require ('pg');   

var TOKEN = process.env.brawlhallaKEY;
//const bh = require('brawlhalla-api')(`${TOKEN}`);

console.log("DATABASE_URL: ", process.env.DATABASE_URL3);
//console.log("Database URL Parse = ", process.env.DATABASE_URL.parse);

const cn = {
    connectionString: process.env.DATABASE_URL3,
    port: 5432,

    // host: process.env.dbHost,
    // user: process.env.dbUserName,
    // password: process.env.dbPassword,
    // database: process.env.db,
    // ssl: true,

}

const pool = new Pool(cn);
pool.connect(err => {
    if(err) console.log(err);
    console.log('Connected to PostgresSQL3!');
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

// ROUTES FOR OUR API
// =============================================================================
router.get('/', function(req, res) {
    //res.json({ message: 'hooray! welcome to our api!'});
    console.log("here");
});



// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');

    next(); // make sure we go to the next routes and don't stop here
});

// more routes will happen here

// async function showStatsByID(id, req, res){
//     var keys = [];
//     keys.push(id);
//     console.log(`showStatsByID:\nkeys[0] = ${keys[0]}`);

//     if (!keys[0]){
//         return null;
//     }
//     //Data for global stats!
//     let searchGlobalQueryData = `SELECT * FROM scooterdata`;

//     const globalData = await new Promise((res, rej) => pool.query(searchGlobalQueryData,  (err, globalData) => err ? rej(err) : res(globalData)));
//     var previousGlobalDamage = parseInt(globalData.rows[0].totaldamage);
//     var previousGlobalGames = parseInt(globalData.rows[0].totalgames);
//     var previousGlobalTime = parseInt(globalData.rows[0].totaltime);
//     var afterGlobalDamage = 0;
//     var afterGlobalGames = 0;
//     var afterGlobalTime = 0;

//     let searchQueryData = `SELECT * FROM brawlhalla WHERE brawlhallaid = $1`;
//     let searchQueryValues = [keys[0]];

//     const data = await new Promise((res, rej) => pool.query(searchQueryData, searchQueryValues, (err, data) => err ? rej(err) : res(data)));

//     let searchQueryData2 = `SELECT * FROM brawlhalla WHERE brawlhallaid = $1`;
//     let searchQueryValues2 = ['totals'];

//     const data2 = await new Promise((res, rej) => pool.query(searchQueryData2, searchQueryValues2, (err, data2) => err ? rej(err) : res(data2)));
//     //console.log("Data = ", data);
    
//     let numLookups;
//     let totalLookups;

//     totalLookups = data2.rows[0].lookups*1;

//     totalLookups += 1;
//     let updateTotalQueryData = `UPDATE brawlhalla SET lookups = $1 WHERE brawlhallaid = $2`;
//     let updateTotalQueryValues = [totalLookups, 'totals'];

//     var previousDamage = 0;
//     var previousGames = 0;
//     var previousTime = 0;

//     var damageDifference = 0;
//     var gamesDifference = 0;
//     var timeDifference = 0;

//     pool.query(updateTotalQueryData, updateTotalQueryValues, err => {
//         if (err) console.log("Failed to update total lookups! ", err);
//         else {
//             console.log("Update totals success!");
//         }
//     });

//     if (data.rows.length == 0){
//         inserted = 1;
//         let insertQueryData = `INSERT INTO brawlhalla (brawlhallaid, brawlhallaname, lookups) VALUES ($1, $2, $3)`;
//         let insertQueryValues = [keys[0], 'default', 1];

//         pool.query(insertQueryData, insertQueryValues, err => {
//             if (err) console.log("Failed to insert player into database!");
//             else {
//                 console.log("Insert success!");
//             }
//         });


//     }
//     else {
//         inserted = 0;
//         numLookups = data.rows[0].lookups*1;
 
//         numLookups += 1;

//         previousDamage = data.rows[0].totaldamage;
//         previousGames = data.rows[0].totalgames;
//         previousTime = data.rows[0].totaltime;

//         let updateQueryData = `UPDATE brawlhalla SET lookups = $1 WHERE brawlhallaid = $2`;
//         let updateQueryValues = [numLookups, data.rows[0].brawlhallaid];
//         pool.query(updateQueryData, updateQueryValues, err => {
//             if (err) console.log("Failed to update upon lookup! ", err);
//             else {
//                 console.log("Update success!");
//             }
//         });

//     }

//     // let searchQueryData3 = `SELECT * FROM brawlhalla WHERE brawlhallaid = $1`;
//     // let searchQueryValues3 = [keys[0]];

//     // const data3 = await new Promise((res, rej) => pool.query(searchQueryData3, searchQueryValues3, (err, data3) => err ? rej(err) : res(data3)));
//     var jsonRanked;

//     await fetch(`https://api.brawlhalla.com/player/${keys[0]}/ranked?api_key=${TOKEN}`)
//     .then(res => res.json())
//     .then(json => {
//         jsonRanked = json;
//     });

    

//     await fetch(`https://api.brawlhalla.com/player/${keys[0]}/stats?api_key=${TOKEN}`)
//         .then(res => res.json())
//         .then(json => {

//             //console.log("This json = ", json);
//             //console.log("json Ranked = ", jsonRanked);

//             var json2 = json;
//             let newLookups;
//             var damageDealt = 0;
//             var timeSpentInGame = 0;

//             if (json == undefined || typeof json === 'undefined' || typeof json.legends === 'undefined'){ //checking to see if json exists or contains anything
//                 json = {error: {code: 404}};
//                 console.log("jsonRanked is not found.\njson: ", json);
//                 res.json(json);
//                 return;
//             }
//             else {
//                 //console.log("json is found!");
//                 //console.log("type of json = ", typeof json);
//                 //console.log(json);
//             }

//             gamesDifference = json.games*1 - previousGames;

//             for (var i = 0; i < json.legends.length; i++){
//                 damageDealt += parseInt(json.legends[i].damagedealt);
//                 timeSpentInGame += parseInt(json.legends[i].matchtime);
//             }

//             damageDifference = damageDealt*1 - previousDamage;
//             timeDifference = timeSpentInGame*1 - previousTime;

//             afterGlobalDamage = previousGlobalDamage + damageDifference;
//             afterGlobalGames = previousGlobalGames + gamesDifference;
//             afterGlobalTime = previousGlobalTime + timeDifference;

//             let updateGlobalQueryData = `UPDATE globalstats SET totaldamage = $1, totalgames = $2, totaltime = $3`;
//             let updateGlobalQueryValues = [afterGlobalDamage, afterGlobalGames, afterGlobalTime];
//             pool.query(updateGlobalQueryData, updateGlobalQueryValues, err => {
//                 if (err) console.log("Failed to update global stats! ", err);
//                 else {
//                     console.log("Updated global stats successfully!");
//                 }
//             });

//             let updatePlayerQueryData = `UPDATE brawlhalla SET totaldamage = $1, totalgames = $2, totaltime = $3 WHERE brawlhallaid = $4`;
//             let updatePlayerQueryValues = [damageDealt, json.games, timeSpentInGame, keys[0]];
//             pool.query(updatePlayerQueryData, updatePlayerQueryValues, err => {
//                 if (err) console.log("Failed to update player total stats!");
//                 else {
//                     console.log("Successfully updated player total damage and total games!");
//                 }
//             });

//             if (inserted){
//                 newLookups = 1;
//                 let updateNameQueryData = `UPDATE brawlhalla SET brawlhallaname = $1 WHERE brawlhallaid = $2`;
//                 let updateNameQueryValues = [json.name, keys[0]];
//                 pool.query(updateNameQueryData, updateNameQueryValues, err => {
//                     if (err) console.log("Failed to update name! ", err);
//                     else {
//                         console.log("Update Name success!");
//                     }
//                 });
//             }
//             else {
//                 newLookups = numLookups;
//                 let updateNameQueryData = `UPDATE brawlhalla SET brawlhallaname = $1 WHERE brawlhallaid = $2`;
//                 let updateNameQueryValues = [json.name, keys[0]];
//                 pool.query(updateNameQueryData, updateNameQueryValues, err => {
//                     if (err) console.log("Failed to update name! ", err);
//                     else {
//                         console.log("Update Name success!");
//                     }
//                 });
//             }            

//             json2.lookups = newLookups;
//             // json.playerRating = jsonRanked.rating;
//             // json.playerPeakRating = jsonRanked.peak_rating;
//             // json.playerTier = jsonRanked.tier;
//             // json.playerWins = jsonRanked.wins;
//             // json.playerGames = jsonRanked.games;
//             json.playerRanked = jsonRanked;
//             //console.log("Json2 = ", json2);
//             //console.log("json returns in showStatsByID(), json looks like: ", json);
//             console.log("json.lookups = ", json.lookups);
//             console.log("json2.lookups = ", json2.lookups);
//             //onsole.log("json.playerRating = ", json.playerRanked);
//             res.json(json);
        
//         });
// }

router.get('/getData', async function(req, res){
    console.log("Search submitted");

    console.log("Req = ", req.query.player);

    var x = req.query.player;

    let searchGlobalQueryData = `SELECT * FROM scooterdata`;
    const globalData = await new Promise((res, rej) => pool.query(searchGlobalQueryData,  (err, globalData) => err ? rej(err) : res(globalData)));
    res.json(obj);

});



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.get('/submit-form', async function( req, res) {
    console.log("Form submitted");

    console.log("req = ", req.query.player);

    var x = req.query.player;
  
    let jsonn;

    await fetch(`https://api.brawlhalla.com/player/${x}/stats?api_key=${TOKEN}`)
        .then(res => res.json())
        .then(json => {
            // console.log("JSON = ", json.error.code);
            
            if ((json.error) && (json.error.code == 404) ){

                res.send('User not found!');
                //jsonn = json;
            }
            else {
                jsonn = json;
                //res.send('User not found!');
            }
        });
   
    
    
 
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});




function getInput(){
    var res = "";

    res = document.formxml.player.value;
    return res;
}

function clickButton(){
    console.log("Running clickButton");
    var x = getInput();
    console.log("x = " + x);

    fetch(`https://api.brawlhalla.com/player/${x}/stats?api_key=${TOKEN}`)
        .then(res => res.json())
        .then(json => console.log(json));

}