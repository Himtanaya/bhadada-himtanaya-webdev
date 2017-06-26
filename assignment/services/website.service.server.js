// const app = require('../../express');
module.exports = function (app, model) {

    // var websiteModel = require('../models/website/website.model.server');
    var websiteModel = model.websiteModel;

    app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/assignment/user/:userId/website/:websiteId', findWebsiteById);
    app.post('/api/assignment/user/:userId/website', createWebsiteForUser);
    app.put('/api/assignment/user/:userId/website/:websiteId', updateWebsite);
    app.delete('/api/assignment/user/:userId/website/:websiteId', deleteWebsiteFromUser);

    function deleteWebsiteFromUser(req, res) {
        var websiteId = req.params.websiteId;
        var userId = req.params.userId;
        websiteModel
            .deleteWebsiteFromUser(userId, websiteId)
            .then(function (status) {
                res.send(status);
            });
    }

    function createWebsiteForUser(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        websiteModel
            .createWebsiteForUser(userId, website)
            .then(function (website) {
                res.json(website);
            });
    }

    function findAllWebsitesForUser(req, res) {
        websiteModel
            .findAllWebsitesForUser(req.params.userId)
            .then(function (websites) {
                res.json(websites);
            })
    }

    function findWebsiteById(req, res) {
        websiteModel
            .findWebsiteById(req.params.websiteId)
            .then(function (website) {
                res.json(website);
            });
    }

    function updateWebsite(req, res) {
        websiteModel
            .updateWebsite(req.params.websiteId, req.body)
            .then(function (status) {
                res.send(status);
            });

    }
}