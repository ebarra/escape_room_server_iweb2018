const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({path: path.join(__dirname, '.private.env')});
dotenv.config({path: path.join(__dirname, '.public.env')});

const bodyParser = require('body-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const logger = require('morgan');
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
var cors = require('cors');

const app = express();

app.use(cors());


//Middlewares

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false})); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  outputStyle: 'extended',
  sourceMap: true
}));
//outputStyle: 'compressed' --> compress style
//debug: true --> to show errors
//indentedSyntax: true --> to read .sass files


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// default value for title local
app.locals.title = 'ESC: The Bomb!';


// routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

module.exports = app;
