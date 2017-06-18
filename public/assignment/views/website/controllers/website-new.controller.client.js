(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  $location,
                                  websiteService,
                                  currentUser) {
        var model = this;

        model.userId = currentUser._id;
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
            console.log(website);
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
            website.developerId = model.userId;
            websiteService
                .createWebsite(model.userId, website)
                .then(function (response) {
                    $location.url('/website');
                });
        }
    }
})();