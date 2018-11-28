const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
const crypto = require('crypto');
const secret = 'ab';
const code_length = 2; //number of characters that this app manages

const app = express();

//Middlewares
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

//ROUTES:
app.post('/code', function (req, res, next) {
  const hash = crypto.createHmac('sha256', secret)
    .update(req.body.key)
    .digest('hex');
  console.log(hash);
  res.json({
    status: "ok",
    code: hash.slice(-code_length)
  });
});

app.post('/check', function (req, res, next) {
  var key = req.body.key;
  var code = req.body.code;

  const hash = crypto.createHmac('sha256', secret)
    .update(req.body.key)
    .digest('hex');
  console.log(hash);
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


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send('error');
});

app.listen(3001, () => console.log('Server app listening on port 3001!'));
