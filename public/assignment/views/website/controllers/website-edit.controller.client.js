(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   $location,
                                   websiteService,
                                   currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            // models.websites = websiteService.findAllWebsitesForUser(models.userId);
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
            if(website === null || website === '' || typeof website === 'undefined' )
            {
                model.error = "Please provide website name";
                return;
            }
            if(website.name === null || website.name === '' || typeof website.name === 'undefined')
            {
                model.error = "Please provide website name";
                return;
            }
            websiteService
                .updateWebsite(websiteId, website, model.userId)
                .then(function (response) {
                    $location.url('/website');
            });
            // $location.url('/user/'+models.userId+'/website');

        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId, model.userId)
                .then(function (response) {
                    $location.url('/website');
                });


        }
    }
})();