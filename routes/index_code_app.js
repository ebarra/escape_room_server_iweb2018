const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const {config} = require('../config/config');
const secret = config.secret;
const code_length = config.codeLength; //number of characters that this app manages
var started = true;
var start_time = new Date();

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '.private.env')});
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = process.env.DB;



router.get('/code', function (req, res, next) {
  res.json({
    status: "error",
    message: "Has hecho un GET, debes hacer un POST"
  });
});

router.post('/code', function (req, res, next) {
  let key = req.body.key;
  console.log("REQ.body: ", req.body);
  console.log("CODE requested for key: " + key);
  if(key===undefined && req.body!==undefined){
    //maybe sent as text/plain with json or something inside.
    //lets get the group code g8XX
    let pos = req.body.toLocaleLowerCase().indexOf("g8");
    if(pos>0){
        key = req.body.substr(pos, 4);
    }
  }
  if(key!==undefined && key.match(/\bG8[a-zA-Z]*/gi) && key.length === 4) {
    const hash = crypto.createHmac('sha256', secret)
      .update(key)
      .digest('hex');
    console.log(hash);
    res.json({
      status: "ok",
      code: hash.slice(-code_length)
    });
  } else {
    res.json({
      status: "error",
      message: 'Introduce tu código de pareja (debe empezar por G8 y contener 4 caracteres)'
    });
  }
});


module.exports = router;
