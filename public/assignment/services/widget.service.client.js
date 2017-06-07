(function () {
    angular
        .module('WAM')
        .factory("widgetService", widgetService);
    
    function widgetService($http) {
        var globalPageId;
        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidgets: sortWidgets
        };
        return api;
        
        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetsByPageId(pageId) {
            globalPageId = pageId;
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function sortWidgets(start, end) {
            var url = '/api/page/:pageId/widget?initial=index1&final=index2';
            url = url
                .replace('pageId', globalPageId)
                .replace('index1', start)
                .replace('index2', end);
            return $http.put(url);
        }


    }
})();