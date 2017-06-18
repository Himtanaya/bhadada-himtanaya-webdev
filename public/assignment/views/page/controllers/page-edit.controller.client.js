(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                   $location,
                                pageService, currentUser) {
        var model = this;

        model.userId = currentUser._id;
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
            if(page === null || page === '' || typeof page === 'undefined' )
            {
                model.error = "Please provide page name";
                return;
            }
            if(page.name === null || page.name === '' || typeof page.name === 'undefined')
            {
                model.error = "Please provide page name";
                return;
            }
            pageService
                .updatePage(pageId, page)
                .then(function (response) {
                    $location.url('/website/'+model.websiteId+'/page');
                });

        }

        function deletePage(pageId) {
            pageService
                .deletePage(pageId, model.websiteId)
                .then(function (response) {
                    $location.url('/website/'+model.websiteId+'/page');
                });

        }
    }
})();
