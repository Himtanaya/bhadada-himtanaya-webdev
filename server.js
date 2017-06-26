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



var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

// configure a project directory to host static content
app.use(express.static(__dirname + '/project'));


// require('./assignment/app')(app);
require ("./test/app.js")(app);
require ("./server/app")(app);

console.log("Starting Server...");
// var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
//
// var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
//
// if (typeof adr === "undefined") {
//     //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
//     //  allows us to run/test the app locally.
//     console.warn('No OPENSHIFT_NODEJS_IP var, using localhost');
//     app.listen(port);
// } else {
//     app.listen(port, ipaddress, function() {
//         console.log('%s: Node server started on %s:%d ...',
//             Date(Date.now() ), ipaddress, port);
//     });
//
// }
var connectionString = 'mongodb://127.0.0.1:27017/bhadada-himtanaya-webdev';

if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

var mongoose = require("mongoose");
mongoose.Promise = require('q').Promise;
mongoose.connect(connectionString);


console.log('Server running at http://localhost:3000');
var port = process.env.PORT || 3000;

app.listen(port);


// var app = require('./express');
// var bodyParser = require('body-parser');
// var passport = require('passport');
// var cookieParser = require('cookie-parser');
// var session      = require('express-session');
//
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//
// app.use(cookieParser());
// app.use(session({
//     secret: "put some text here",
//     // secret: process.env.SESSION_SECRET, //Store it in process.env.SESSION_SECRET
//     resave: true,
//     saveUninitialized: true
// }));
// // app.use(session({ secret: "put some text here" }));
// app.use(passport.initialize());
// app.use(passport.session());
//
// app.set('view engine', 'ejs');
// // require('./utilities/filelist');
//
// app.use(app.express.static(__dirname + '/public'));
//
// // require('./assignment/app');
// require ("./test/app.js")(app);
// require('./project/app')(app);
//
// // require('./assignment/graduates/app');
//
// // app.listen(process.env.PORT || 3000);
//
// console.log('Server running at http://localhost:3000');
// var port = process.env.PORT || 3000;
//
// app.listen(port);