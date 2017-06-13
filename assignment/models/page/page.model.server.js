var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('GraduatePageModel', pageSchema);
var websiteModel = require('../website/website.model.server');

// api
pageModel.findPagesByWebsiteId = findPagesByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.createPage = createPage;
pageModel.updatePage = updatePage;
pageModel.deletePageFromWebsite = deletePageFromWebsite;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
// pageModel.reorderWidget = reorderWidget;

module.exports = pageModel;

function findPagesByWebsiteId(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website', '_user')
        .populate("_website._user", 'username')
        .exec();
}

function findPageById(pageId) {
    return pageModel
        .findById(pageId)
        .populate('_website', '_user')
        .populate("_website._user", 'username')
        .exec();
}

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id);
        })
}

function deletePageFromWebsite(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .deletePage(websiteId, pageId);
        });
}

function updatePage(pageId, newPage) {
    return pageModel.update({_id: pageId}, {$set: newPage});
}


function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index,1);
            return page.save();
        })
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}


// function reorderWidget(pageId, start, end) {
//     return pageModel
//         .findOne({_id: pageId})
//         .then(function (page) {
//             page.widgets.splice(end, 0, page.widgets.splice(start,1)[0]);
//             page.markModified('widgets');
//             page.save();
//             console.log("model.server: reorder widgets returned");
//             console.log(page);
//             return page;
//         },function (err) {
//             console.log(err);
//         });
// }