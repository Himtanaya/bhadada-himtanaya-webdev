(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  $location,
                                  pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        function createPage(page) {
            pageService.createPage(model.websiteId, page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();
