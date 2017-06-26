module.exports = function (app) {
    var userModel = require('./user/user.model.server')(app);
    var websiteModel = require('./website/website.model.server')(app);
    var pageModel = require('./page/page.model.server')(app);
    var widgetModel = require('./widget/widget.model.server')(app);
    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };
    return model;
};

