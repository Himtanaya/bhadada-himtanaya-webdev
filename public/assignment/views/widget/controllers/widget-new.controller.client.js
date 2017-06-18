(function () {
    angular
        .module('WAM')
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($location, $routeParams, widgetService, currentUser) {
        var model = this;

        model.userId = currentUser._id;
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
            // if(widget === null || widget === '' || typeof widget === 'undefined' )
            // {
            //     model.error = "Please provide page name";
            //     return;
            // }
            // if(widget.name === null || widget.name === '' || typeof widget.name === 'undefined')
            // {
            //     model.error = "Please provide page name";
            //     return;
            // }
            var widget = {};
            widget.type = widgetType;
            widget.deletable=true;
            widgetService
                .createWidget(model.pageId, widget)
                .then(function(widget)
                {
                    console.log("widget new-controller"+widget._id);
                    // console.log(widget.type);
                    // console.log(widget);
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
                });
        }
    }
})();

