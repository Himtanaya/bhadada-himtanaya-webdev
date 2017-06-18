(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  $location,
                                  pageService, currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

        function init() {
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(renderPages);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }

        function createPage(page) {
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
                .createPage(model.websiteId, page)
                .then(function (response) {
                    $location.url('/website/'+model.websiteId+'/page');
                });
        }
    }
})();
