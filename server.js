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

app.get('/test', async function( req, res) {
    console.log("Form submitted");

    console.log("req = ", req.query.player);

    var x = req.query.player;
  
    let jsonn;

    await fetch(`https://${x}/stats?api_key=${TOKEN}`)
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
   );
 
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