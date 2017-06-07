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
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(renderPages);

            pageService
                .findPageById(model.pageId)
                .then(renderPage);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }

        function renderPage(page) {
            model.page = page;
        }


        function updatePage(page, pageId) {
            pageService
                .updatePage(pageId, page)
                .then(function (response) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });

        }

        function deletePage(pageId) {
            pageService
                .deletePage(pageId)
                .then(function (response) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });

        }
    }
})();
