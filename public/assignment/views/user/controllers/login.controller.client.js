(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {
            userService
                .login(username, password)
                .then(function (found) {
                    console.log(found);
                    if (found !== null) {
                        $location.url('/profile');
                    }
                }, function (err) {
                    model.message = "sorry, " + username + " not found. please try again!"
                });

        }
    }
})();