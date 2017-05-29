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

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();

        //event handlers
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function updateWidget(){
            widgetService.updateWidget(model.widgetId, model.widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }
    }
})();
