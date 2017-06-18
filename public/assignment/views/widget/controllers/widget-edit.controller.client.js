(function () {
    angular
        .module('WAM')
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($sce, $routeParams, widgetService, $location, currentUser) {
        var model = this;

        model.doYouTrustUrl = doYouTrustUrl;
        model.userId = currentUser._id;
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
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });

        }

        function updateWidget(){
            if(model.widget === null || model.widget === '' || typeof model.widget === 'undefined' )
            {
                model.error = "Please provide widget name";
                return;
            }
            if(model.widget.name === null || model.widget.name === '' || typeof model.widget.name === 'undefined')
            {
                model.error = "Please provide widget name";
                return;
            }
            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function(response)
                {
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });

        }
    }
})();
