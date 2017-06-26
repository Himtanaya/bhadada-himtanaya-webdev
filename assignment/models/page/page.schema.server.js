module.exports = function () {
    var mongoose = require('mongoose');

    var pageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: "GraduateWebsiteModel"},
        name: String,
        description: String,
        dateCreated: {type: Date, default: Date.now},
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "GraduateWidgetModel"}]
    }, {collection: 'graduate_page'});

    return pageSchema;
}