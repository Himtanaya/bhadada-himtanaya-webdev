var app = require('../../express');

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Today we got <a href="http://io9.gizmodo.com/the-new-game-of-thrones-trailer-is-here-and-everyone-i-1795509917" target="_blank" rel="noopener">our first good look</a> at <em>Game of Thrones</em>’ seventh season, and boy howdy does it look like we’re in for some dark times ahead. But while the trailer is suitably cryptic, if you’ve been paying close attention to <a href="http://io9.gizmodo.com/everything-we-know-about-game-of-thrones-seventh-season-1788588295" target="_blank" rel="noopener">the rumors</a> surrounding this penultimate season, it paints an intriguing picture of the battles…<span class="read-more-placeholder"></span></p>'},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" }
    // { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.get('/api/page/:pageId/widget', findWidgetsByPageId);
app.get ('/api/widget/:widgetId', findWidgetById);
app.post('/api/page/:pageId/widget', createWidget);
app.put ('/api/widget/:widgetId', updateWidget);
app.delete ('/api/widget/:widgetId', deleteWidget);
app.put('/api/page/:pageId/widget', sortWidgets);

var multer = require('multer'); // npm install multer --save
var upload = multer({
    dest: __dirname+'/../../public/uploads'
});

app.post ("/api/upload", upload.single('myFile'), uploadImage);

// var imageCount = 1000;
function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var userId        = req.body.userId;
    var pageId        = req.body.pageId;
    var websiteId      = req.body.websiteId;
    var myFile        = req.file;
    var originalname  = myFile.originalname;
    var filename      = myFile.filename;
    var path          = myFile.path;
    var destination   = myFile.destination;
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    console.log(originalname);
    console.log(filename);

    widget = getWidgetById(widgetId);
    widget.url = '/uploads/'+filename;
    console.log(widget);

    var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
    res.redirect(callbackUrl);
}

// var count = 1000;

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    for(var w in widgets){
        if (widgets[w]._id === widgetId) {
            widgets.splice(w,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    for(var w in widgets){
        if (widgets[w]._id === widgetId)
        {
            widgets[w].name = widget.name;
            widgets[w].size = widget.size;
            widgets[w].text = widget.text;
            if (widget.width)
            {
                widgets[w].width = widget.width + "%";
            }
            widgets[w].url = widget.url;
            widgets[w].editing = false;
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function createWidget(req, res) {
    var pageId = req.params.pageId;
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    for(var w in widgets){
        if(widgets[w]._id === widgetId) {
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;
    var result = [];
    for(var w in widgets){
        if (widgets[w].pageId === pageId && !widgets[w].editing)
            result.push(widgets[w]);
    }
    res.json(result);
}

function getWidgetById(widgetId) {
    for(var w in widgets){
        if(widgets[w]._id === widgetId) {
            return widgets[w];
        }
    }
    return null;
}

function sortWidgets(req, res) {
    var start = req.query.initial;
    var end = req.query.final;
    var pageId = req.params.pageId;
    var counter = 0;
    for(var w in widgets) {
        if (widgets[w].pageId === pageId && !widgets[w].editing) {
            if (counter === start){
                start = w;
            }
            if (counter === end){
                end = w;
            }
            counter ++;
        }
    }
    widgets.splice(end, 0, widgets.splice(start,1)[0]);
}