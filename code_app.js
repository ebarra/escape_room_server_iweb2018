const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({path: path.join(__dirname, '.private.env')});
dotenv.config({path: path.join(__dirname, '.public.env')});

const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
var cors = require('cors');

const code_app = express();

code_app.use(cors());

//Middlewares
code_app.use(logger('dev'));
code_app.use(bodyParser.urlencoded({extended: false})); // support encoded bodies
code_app.use(bodyParser.json()); // support json encoded bodies
code_app.use(bodyParser.text()); // support json encoded bodies


const indexRoutesCodeApp = require('./routes/index_code_app');
code_app.use('/', indexRoutesCodeApp);


module.exports = code_app;
