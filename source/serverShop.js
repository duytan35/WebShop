require('dotenv').config();
const path = require('path');
const { engine } = require("express-handlebars");
const express = require("express");
var morgan = require("morgan"); // display connect client information
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const route = require('./routes/shopRoute/index.js')

app.use(bodyParser.urlencoded({ extended: false }))// parameter url
app.use(bodyParser.json());// body request
app.use(cookieParser());

app.engine(".hbs", engine({extname: '.hbs'}));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

const session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    sameSite: true,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

const port = process.env.PORT_SHOP || 3001;
app.use(morgan("combined"));

app.use(express.static(path.join(__dirname + '/public')));

route(app);


app.listen(port, () => {
    console.log(`Server shop listening on port ${port}`);
});
