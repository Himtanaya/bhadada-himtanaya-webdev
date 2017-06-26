(function () {
    angular
        .module("musicApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.client.view.html',
                controller: 'mainController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: 'views/user/login.client.view.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/register.client.view.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/profile.client.view.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
    }
})();