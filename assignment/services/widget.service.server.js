// const app = require('../../express');

module.exports = function (app, model) {

    // var widgetModel = require('../models/widget/widget.model.server');
    // var pageModel = require('../models/page/page.model.server');
    var widgetModel = model.widgetModel;
    var pageModel = model.pageModel;

    app.get('/api/page/:pageId/widget', findWidgetsByPageId);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.post('/api/page/:pageId/widget', createWidget);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/page/:pageId/widget/:widgetId', deleteWidget);
    app.put('/api/page/:pageId/widget', sortWidgets);

    var multer = require('multer'); // npm install multer --save
    var upload = multer({
        dest: __dirname + '/../../public/uploads'
    });

    app.post("/api/upload", upload.single('myFile'), uploadImage);

// var imageCount = 1000;
    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var pageId = req.body.pageId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;

        var originalname = myFile.originalname;
        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        console.log(originalname);
        console.log(filename);

        // widget = getWidgetById(widgetId);

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                widget.url = '/uploads/' + filename;

                return widgetModel
                    .updateWidget(widgetId, widget);
            })
            .then(function (widget) {
                var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
                res.redirect(callbackUrl);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

        // widget.url = '/uploads/'+filename;
        // console.log(widget);

        // var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
        // res.redirect(callbackUrl);
    }

// var count = 1000;

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        console.log("widgetId" + widgetId);
        widgetModel
            .deleteWidget(req.params.widgetId)
            .then(function (status) {
                res.send(status);
            });
    }

    function updateWidget(req, res) {
        var widget = req.body;
        widgetModel
            .updateWidget(req.params.widgetId, widget)
            .then(function (status) {
                res.send(status);
            });
    }

    function createWidget(req, res) {
        var widget = req.body;
        var type = widget.type;
        console.log("inside service server create");
        widgetModel
            .createWidget(req.params.pageId, widget)
            .then(
                //     function (err) {
                //     console.log(err);
                // },
                function (widget) {
                    console.log("service server: " + widget);
                    res.json(widget);
                })
        // .then(function (widget) {
        //     console.log("service server: " + widget);
        //     res.json(widget);
        // },
        // function (err) {
        //     console.log(err);
        // });
    }

    function findWidgetById(req, res) {
        widgetModel
            .findWidgetById(req.params.widgetId)
            .then(function (widget) {
                res.json(widget);
            });
    }

    function findWidgetsByPageId(req, res) {
        // console.log("widget.service.server");
        widgetModel
            .findWidgetsByPageId(req.params.pageId)
            .then(function (widgets) {
                // console.log("widget.service.server: widgets returned");
                // console.log(widgets);
                res.json(widgets);
            }, function (err) {
                console.log(err)
            });
    }

// function getWidgetById(widgetId) {
//     for(var w in widgets){
//         if(widgets[w]._id === widgetId) {
//             return widgets[w];
//         }
//     }
//     return null;
// }

    function sortWidgets(req, res) {
        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);
        var pageId = req.params.pageId;
        widgetModel
            .reorderWidget(pageId, start, end)
            // .then(function (page) {
            //     res.json(page)
            // });
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                console.log("widget server service reorder:" + err);
            });
        // var counter = 0;
        // for(var w in widgets) {
        //     if (widgets[w].pageId === pageId && !widgets[w].editing) {
        //         if (counter === start){
        //             start = w;
        //         }
        //         if (counter === end){
        //             end = w;
        //         }
        //         counter ++;
        //     }
        // }
        // widgets.splice(end, 0, widgets.splice(start,1)[0]);
    }

}