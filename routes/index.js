const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const secret = 'ab';
const code_length = 2; //number of characters that this app manages
const {config} = require('../config/config');
let started = true;

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {started, config});
});

/* admin page */
router.get('/admin', (req, res, next) => {
  res.render('admin', {started, config});
});

router.post('/admin', (req, res, next) => {
  if(req.body.adminPassword === process.env.CODE) {
    started = true;
    res.render('admin', {started, config});
  } else {
    res.redirect('/');
  }
});

router.post('/code', function (req, res, next) {
  const hash = crypto.createHmac('sha256', secret)
    .update(req.body.key)
    .digest('hex');
  console.log(hash);
  res.json({
    status: "ok",
    code: hash.slice(-code_length)
  });
});

router.post('/check', function (req, res, next) {
  var key = req.body.key;
  var code = req.body.code;
  //console.log("PIDE CODIGO de ", key, code);

  const hash = crypto.createHmac('sha256', secret)
    .update(req.body.key)
    .digest('hex');
  //console.log(hash);
  const rightcode = hash.slice(-code_length);
  if (code === rightcode) {
    res.json({
      status: "ok",
      message: 'Bien!'
    });
  } else {
    res.json({
      status: "error",
      message: 'Mal!'
    });
  }
});


module.exports = router;
