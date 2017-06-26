// var connectionString = 'mongodb://127.0.0.1:27017/bhadada-himtanaya-webdev';
//
// if(process.env.MLAB_USERNAME) {
//     connectionString = process.env.MLAB_USERNAME + ":" +
//         process.env.MLAB_PASSWORD + "@" +
//         process.env.MLAB_HOST + ':' +
//         process.env.MLAB_PORT + '/' +
//         process.env.MLAB_APP_NAME;
// }
//
// var mongoose = require("mongoose");
// mongoose.Promise = require('q').Promise;
// mongoose.connect(connectionString);

module.exports = function (app) {
    var model = require("./models/models.server")(app);
    require("./services/user.service.server")(app, model);
    require("./services/website.service.server")(app, model);
    require("./services/page.service.server")(app, model);
    require("./services/widget.service.server")(app, model);
};
