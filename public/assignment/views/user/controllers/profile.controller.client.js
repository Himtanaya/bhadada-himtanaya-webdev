(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService, currentUser) {

        var model = this;

        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregister = unregister;
        // userService
        //     .findUserById(model.userId)
        //     .then(renderUser, userError);

        function init() {
            renderUser(currentUser);
        }
        init();

        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/');
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update was successful";
                });
            // var user = userService.updateUser(model.userId, user);
            // $location.url('/user/'+model.userId+'/website');
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }

    }
})();