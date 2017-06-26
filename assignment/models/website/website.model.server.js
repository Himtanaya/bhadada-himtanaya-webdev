module.exports = function (model) {
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server')();
    var websiteModel = mongoose.model('GraduateWebsiteModel', websiteSchema);
    var userModel = require('../user/user.model.server');

// api
    websiteModel.findAllWebsites = findAllWebsites;
    websiteModel.findWebsiteById = findWebsiteById;
    websiteModel.createWebsiteForUser = createWebsiteForUser;
    websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
    websiteModel.deleteWebsiteFromUser = deleteWebsiteFromUser;
    websiteModel.updateWebsite = updateWebsite;
    websiteModel.deletePage = deletePage;
    websiteModel.addPage = addPage;

// module.exports = websiteModel;

    function deletePage(websiteId, pageId) {
        return websiteModel
            .findById(websiteId)
            .then(function (website) {
                var index = website.pages.indexOf(pageId);
                website.pages.splice(index, 1);
                return website.save();
            })
    }

    function addPage(websiteId, pageId) {
        return websiteModel
            .findById(websiteId)
            .then(function (website) {
                website.pages.push(pageId);
                return website.save();
            });
    }

    function deleteWebsiteFromUser(userId, websiteId) {
        return websiteModel
            .remove({_id: websiteId})
            .then(function (status) {
                return userModel
                    .deleteWebsite(userId, websiteId);
            });
    }

    function findAllWebsitesForUser(userId) {
        return websiteModel
            .find({_user: userId})
            .populate('_user')
            .exec();
    }

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return websiteModel
            .create(website)
            .then(function (website) {
                return userModel
                    .addWebsite(userId, website._id)
            })
    }

    function findAllWebsites() {
        return websiteModel.find();
    }

    function updateWebsite(websiteId, newWebsite) {

        return websiteModel.update({_id: websiteId}, {$set: newWebsite});
    }

    function findWebsiteById(websiteId) {
        return websiteModel
            .findById(websiteId)
            .populate('_user', 'username')
            .exec();
    }

}