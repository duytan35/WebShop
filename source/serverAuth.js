require('dotenv').config();
var jwt = require('jsonwebtoken');
var fs = require('fs');
var https = require('https');
const path = require('path');

const { engine } = require("express-handlebars");
const express = require("express");
var morgan = require("morgan"); // display connect client information
var bodyParser = require("body-parser");

const app = express();
const route = require('./routes/authRoute/index.js')

app.use(bodyParser.urlencoded({ extended: false }))// parameter url
app.use(bodyParser.json());// body request

app.engine(".hbs", engine({extname: '.hbs'}));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

const session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

const port = process.env.PORT_AUTH || 3000;
app.use(morgan("combined"));

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,     
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname + '/public')));

route(app);

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var server = https.createServer(options, app);

app.get("/home", (req, res) => {
  console.log(req.session.token);
  console.log(req.session);
  try {
    var veri_token = jwt.verify(req.session.token, process.env.SECRET);
    if(veri_token){
      res.send("success");
    }
    else res.send("fail");
  }
  catch (err){
    res.send(err);
  }
})

server.listen(port, () => {
    console.log(`Server auth listening on port ${port}`);
});