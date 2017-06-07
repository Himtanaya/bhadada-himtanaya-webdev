(function () {
    angular
        .module('WAM')
        .factory('FlickrService', FlickrService);

    function FlickrService($http) {

        var key = "8ef0f9202ecdf0bf5e59797385882f7f";
        var secret = "197005b193a5c97b";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            "searchPhotos": searchPhotos
        };
        return api;
        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }


    }
})();