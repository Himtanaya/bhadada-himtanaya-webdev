(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {
            // userService
            //     .findUserByCredentials(username, password)
            //     .then(function (found) {
            //         console.log(found);
            //         if(found !== null) {
            //             $location.url('/user/' + found._id);
            //         }
            //         else {
            //             models.message = "sorry, " + username + " not found. please try again!";
            //         }
            //     });
            userService
                .findUserByCredentials(username, password)
                .then(function (found) {
                    console.log(found);
                    if (found !== null) {
                        $location.url('/user/' + found._id);
                    }
                }, function (err) {
                    model.message = "sorry, " + username + " not found. please try again!"
                });
                // .error(
                //     model.message = "sorry, " + username + " not found. please try again!"
                // );

        }
    }
})();