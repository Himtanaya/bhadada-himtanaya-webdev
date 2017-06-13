var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('GraduateWidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.createWidget = createWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;


function findWidgetsByPageId(pageId) {
    // return widgetModel.find({_page: pageId});
    console.log("in findWidgetsByPageId 1st step");
    console.log(pageId);
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var pageWidgets = page.widgets;
            var widgetCount = pageWidgets.length;
            var result = [];
            // console.log("pageWidgets"+pageWidgets);
            // var temp = getWidgets(pageWidgets, widgetCount, result);
            // console.log("result of getWidgets" + temp);
            return getWidgets(pageWidgets, widgetCount, result);
        }, function (error) {
            console.log(error);
            return error;
        });
}

function getWidgets(pageWidgets, widgetCount, result) {
    if(widgetCount == 0) {
        return result;
    }
    return findWidgetById(pageWidgets.shift())
        .then(function (widget) {
            result.push(widget);
            // console.log("getWidgets -> findWidgetById widget: " + widget);
            // console.log("getWidgets -> findWidgetById" + result);
            return getWidgets(pageWidgets, --widgetCount, result);
        }, function (error) {
            // console.log("getWidgets -> findWidgetById error" + error);
            return error;
        });
}

function findWidgetById(widgetId) {
    return widgetModel
        .findById({_id: widgetId})
        .then(function (widget) {
            // console.log("findWidgetById:" + widget);
            return widget;
        });
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function createWidget(pageId, widget) {
    return widgetModel
        .create({
            _page: pageId,
            type: widget.type
        })
        .then(function (widget) {
            return pageModel
                .findPageById(pageId)
                .then(function (page) {
                    page.widgets.push(widget._id);
                    page.save();
                    return widget;
                }, function (error) {
                    return error;
                })
        });
}


function deleteWidget(widgetId) {
    return widgetModel
        .findOne({_id: widgetId})
        .then(function (widget) {
            var widgetPageId = widget._page;
            return deleteWidgetFromPage(widgetPageId, widgetId)
                .then(function () {
                    if(widget.type == "IMAGE"){
                        deleteImage(widget.url);
                    }
                    return widgetModel.remove({_id: widgetId});
                }, function (error) {
                    return error;
                });
        }, function (error) {
            return error;
        });
}

function deleteWidgetFromPage(widgetPageId, widgetId) {
    return pageModel
        .findPageById(widgetPageId)
        .then(function (page) {
            for(var wd in page.widgets) {
                if(page.widgets[wd] == widgetId) {
                    page.widgets.splice(wd, 1);
                    page.save();
                    return;
                }
            }
        }, function (error) {
            return error;
        });
}

function deleteImage(url) {
    if(url && url.search('http') == -1) {
        fs.unlink(publicDirectory + url, function (error) {
            if(error) {
                return error;
            }
        });
    }

}

function reorderWidget(pageId, start, end) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
            page.save();
            return page;
        }, function (error) {
            return error;
        })
}



