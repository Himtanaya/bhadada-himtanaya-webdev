var app = require('../../express');

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

app.get ('/api/assignment/page/:pageId', findPageById);
app.get('/api/assignment/website/:websiteId/page', findPagesByWebsiteId);
app.post('/api/assignment/website/:websiteId/page', createPage);
app.put ('/api/assignment/page/:pageId', updatePage);
app.delete ('/api/assignment/page/:pageId', deletePage);


function deletePage(req, res) {
    var pageId = req.params.pageId;
    for(var p in pages) {
        if(pageId == pages[p]._id) {
            pages.splice(p,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    for(var p in pages) {
        if(pageId == pages[p]._id) {
            pages[p].name = page.name;
            pages[p].description = page.description;
            pages[p].updated = new Date();
            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}

function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.websiteId = websiteId;
    pages.push(page);
    res.json(page);
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    for(var p in pages) {
        if(pageId == pages[p]._id) {
            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}

function findPagesByWebsiteId(req, res) {
    var websiteId = req.params.websiteId;
    var results = [];
    for(var p in pages) {
        if(websiteId == pages[p].websiteId) {
            results.push(pages[p]);
        }
    }
    res.json(results);
}