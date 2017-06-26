(function () {
    angular
        .module("musicApp", [])
        .controller("searchController", searchController);
    
    function searchController($http) {
        var model = this;

        var key = '1459500a61d442bb8aaae3f69c99a1fa';
        var method = 'track.search';
        model.searchInput = searchInput;
        model.getImage = getImage;
        model.searchTracksById = searchTracksById;
        function searchInput(title) {
            var url = 'http://ws.audioscrobbler.com/2.0/?method='+method+'&track='+title+'&api_key='+key+'&format=json';
            // var url = 'http://ws.audioscrobbler.com/2.0/?method=track.search&artist=After+The+Burial&api_key=1459500a61d442bb8aaae3f69c99a1fa&format=json';
            $http.get(url)
                .then(renderTracks);
        }

        function renderTracks(tracks) {
            model.tracks = tracks.data.results.trackmatches.track;
        }

        function getImage(track) {
            return track.image[2]['#text']?track.image[2]['#text']:'../uploadss/default_track.png';
        }

        function searchTracksById(track) {
            var url = 'http://ws.audioscrobbler.com/2.0/?method='+method+'&track='+track.name+'&mbid'+track.mbid+'&api_key='+key+'&format=json';
            model.track = track;
            model.track.image = getImage(track);
            // $http.get(url)
            //     .then(renderTrack);
        }

        function renderTrack(track) {
            model.track = track.data.results.trackmatches.track;
            // for(var track in tracks)
            // {
            //     var image = track.image;
            //     var name = track.name;
            //     var artist = track.artist;
            // }
        }
    }
    
})();

// http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=After+The+Burial&api_key=1459500a61d442bb8aaae3f69c99a1fa&format=json