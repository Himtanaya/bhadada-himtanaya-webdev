(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            // model.websites = websiteService.findAllWebsitesForUser(model.userId);
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);

            websiteService
                .findWebsiteById(model.websiteId, model.userId)
                .then(renderWebsite);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(website) {
            model.website = website;
        }

        function updateWebsite(website, websiteId) {
            websiteService
                .updateWebsite(websiteId, website, model.userId)
                .then(function (response) {
                    $location.url('/user/'+model.userId+'/website');
            });
            // $location.url('/user/'+model.userId+'/website');

        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId, model.userId)
                .then(function (response) {
                    $location.url('/user/'+model.userId+'/website');
                });


        }
    }
})();