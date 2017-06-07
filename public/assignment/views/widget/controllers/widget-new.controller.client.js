(function () {
    angular
        .module('WAM')
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($location, $routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        // event handlers
        model.addWidget = addWidget;

        function init() {

            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }



        function addWidget(widgetType) {
            var widget = {};
            widget.widgetType = widgetType;
            widget.editing=true;
            widgetService
                .createWidget(model.pageId, widget)
                .then(function(widget)
                {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
                });

        }
    }
})();

