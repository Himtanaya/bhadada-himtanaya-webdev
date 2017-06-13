(function () {
    angular
        .module('WAM')
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($sce, $routeParams, widgetService, $location) {
        var model = this;

        model.doYouTrustUrl = doYouTrustUrl;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        //event handlers
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(renderWidgets);

            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);
        }
        init();

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        function renderWidget(widget) {
            model.widget = widget;
        }


        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId, model.pageId)
                .then(function(response)
                {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });

        }

        function updateWidget(){
            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function(response)
                {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });

        }
    }
})();
