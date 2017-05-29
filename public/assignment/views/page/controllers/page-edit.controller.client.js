(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                   $location,
                                pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        function updatePage(page) {
            pageService.updatePage(model.page._id, page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();
