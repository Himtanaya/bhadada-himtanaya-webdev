const app = require('../../express');

var pageModel = require('../models/page/page.model.server');

app.get ('/api/assignment/page/:pageId', findPageById);
app.get('/api/assignment/website/:websiteId/page', findPagesByWebsiteId);
app.post('/api/assignment/website/:websiteId/page', createPage);
app.put ('/api/assignment/page/:pageId', updatePage);
app.delete ('/api/assignment/website/:websiteId/page/:pageId', deletePageFromWebsite);


function deletePageFromWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    pageModel
        .deletePageFromWebsite(websiteId, pageId)
        .then(function (status) {
            res.send(status);
        });
}

function updatePage(req, res) {
    var page = req.body;
    pageModel
        .updatePage(req.params.pageId, page)
        .then(function (status) {
            res.send(status)
        });
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page)
        });
}

function findPageById(req, res) {
   pageModel
       .findPageById(req.params.pageId)
       .then(function (page) {
           res.json(page);
       });
}

function findPagesByWebsiteId(req, res) {
    pageModel
        .findPagesByWebsiteId(req.params.websiteId)
        .then(function (pages) {
            res.json(pages);
        });
}