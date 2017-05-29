(function () {
    angular
        .module('WAM')
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($location, $routeParams, widgetService) {
        var model = this;

        function init() {
            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        // event handlers
        model.addWidget = addWidget;

        function addWidget(widgetType) {
            var widget = {};
            widget.widgetType = widgetType;
            var id = (widgetService.createWidget(model.pageId, widget))._id;
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+id);
        }
    }
})();