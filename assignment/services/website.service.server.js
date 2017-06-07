var app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get ('/api/assignment/user/:userId/website/:websiteId', findWebsiteById);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.put ('/api/assignment/user/:userId/website/:websiteId', updateWebsite);
app.delete ('/api/assignment/user/:userId/website/:websiteId', deleteWebsite);


function deleteWebsite(req, res){
    var websiteId = req.params.websiteId;
    for(var w in websites) {
        if(websiteId === websites[w]._id) {
            websites.splice(w,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWebsite(req, res){
    var websiteId = req.params.websiteId;
    var website = req.body;
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            websites[w].name = website.name;
            websites[w].description = website.description;
            res.json(websites[w]);
            // res.sendStatus(200);
            // return;
        }
    }
    res.sendStatus(404);
}

function createWebsite(req, res){
    var userId = req.params.userId;
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    website.update = new Date();
    websites.push(website);
    res.json(website);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    for(var w in websites) {
        if(websiteId === websites[w]._id) {
            res.send(websites[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    var results = [];
    for(var w in websites)
    {
        if(websites[w].developerId === userId)
        {
            results.push(websites[w]);
        }
    }
    res.json(results);
}
