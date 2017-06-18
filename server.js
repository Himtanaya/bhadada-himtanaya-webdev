// var express = require('express');
// var app = express();
//
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// // configure a public directory to host static content
// app.use(express.static(__dirname + '/public'));
//
// require ("./test/app.js")(app);
//
// var port = process.env.PORT || 3000;
//
// app.listen(port);
// var express = require('express');
// var app = express();
//
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// // configure a public directory to host static content
// app.use(express.static(__dirname + '/public'));
//
// require ("./test/app.js")(app);
// require ("./assignment/app.js")(app);
//
// var port = process.env.PORT || 3000;
//
// app.listen(port);


var app = require('./express');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());
app.use(session({
    secret: "put some text here",
    // secret: process.env.SESSION_SECRET, //Store it in process.env.SESSION_SECRET
    resave: true,
    saveUninitialized: true
}));
// app.use(session({ secret: "put some text here" }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
// require('./utilities/filelist');

app.use(app.express.static(__dirname + '/public'));

require('./assignment/app');

// require('./assignment/graduates/app');

app.listen(process.env.PORT || 3000);