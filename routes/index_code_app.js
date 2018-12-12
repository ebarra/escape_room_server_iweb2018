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
  const key = req.body.key;
  console.log("CODE requested for key: " + key);
  //if(key[0] === 'G' || key[0] === 'g' && key[1] === '8' && key.length === 4) {
  if(key.match(/\bG8[a-zA-Z]*/gi) && key.length === 4) {
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
