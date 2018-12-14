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



/* GET home page */
router.get('/', (req, res, next) => {
  ///calc remaining time
  const now = new Date();
  const diff = now - start_time;
  const rem_time = Math.floor(config.durationSecs - diff/1000);
  res.render('index', {started, config, rem_time});
});

/* admin page */
router.get('/admin', (req, res, next) => {
  res.render('admin', {started, config});
});

router.post('/admin', (req, res, next) => {
  if(req.body.adminPassword === process.env.CODE) {
    started = !started;
    start_time = new Date();
  }
  res.redirect('/');
});


router.post('/check', function (req, res, next) {
  var key = req.body.key;
  var code = req.body.code;
  console.log("CODE: ", code);
  
  var right = undefined;
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //console.log("PIDE CODIGO de ", key, code);
  const hash = crypto.createHmac('sha256', secret)
    .update(key)
    .digest('hex');
  //console.log(hash);
  const rightcode = hash.slice(-code_length);

  if (code === rightcode) {
    right = true;
    res.json({
      status: "ok",
      message: 'Bien!'
    });
  } else {
    right = false;
    res.json({
      status: "error",
      message: 'Mal!',
      penalty: config.penaltySecs
    });
  }

  const now = new Date();
  const diff = now - start_time;
  const rem_time = Math.floor(config.durationSecs - diff/1000);

  (async function() {
    const client = new MongoClient(url);
    try {
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      let attempt = await db.collection('attempts').insertOne(
        {
          ip: ip,
          key,
          code,
          time: now,
          rem_time: rem_time,
          right
        }
      );
    } catch (err) {console.log(err.stack);}
    client.close();
  })();

});


module.exports = router;
