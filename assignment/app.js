// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/bhadada-himtanaya-webdev');
// mongoose.Promise = require('q').Promise;

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

require("./services/user.service.server");
require("./services/website.service.server");
require("./services/page.service.server");
require("./services/widget.service.server");
