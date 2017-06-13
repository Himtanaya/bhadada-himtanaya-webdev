(function () {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService($http) {
        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;
        this.createPage = createPage;


        function createPage(websiteId, page) {
            var url = "/api/assignment/website/" + websiteId + "/page";
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            var url = "/api/assignment/page/" + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId, websiteId) {
            var url = "/api/assignment/website/"+websiteId+"/page/" + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPagesByWebsiteId(websiteId) {
            var url = "/api/assignment/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
