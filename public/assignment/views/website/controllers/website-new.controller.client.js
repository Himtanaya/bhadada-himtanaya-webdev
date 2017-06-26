(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  $location,
                                  websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        function init() {
            // models.websites = websiteService.findAllWebsitesForUser(models.userId);
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService
                .createWebsite(model.userId, website)
                .then(function (response) {
                    $location.url('/user/'+model.userId+'/website');
                });

        }
    }
})();