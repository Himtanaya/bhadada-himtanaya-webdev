(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init(){
            model.user = userService.findUserById(model.userId);
        }
        init();

        function updateUser(newUser) {
            var user = userService.updateUser(model.userId, newUser);
            $location.url('/user/'+model.userId+'/website');
        }

        function deleteUser() {
            userService.deleteUser(model.userId);
            $location.url('/login');

        }

    }
})();