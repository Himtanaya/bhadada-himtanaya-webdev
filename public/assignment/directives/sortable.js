(function () {
    angular
        .module('directives', [])
        .directive('sortable', sortableDir);

    function sortableDir() {
        function linkFunc(scope, element) {
            var startIndex = -1;
            var stopIndex = -1;
            element
                .sortable({
                    axis: 'y',
                    handle: ".glyphicon-align-justify",
                    start: function (event, ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function (event, ui) {
                        stopIndex = ui.item.index();
                        scope.sortableController.sort(startIndex, stopIndex);
                    }
                })
                .disableSelection();
        }
        return {
            scope:{},
            link: linkFunc,
            controller: sortableController,
            controllerAs: 'sortableController'
        };
    }

    function sortableController(widgetService) {
        var vm = this;
        vm.sort = sort;

        function sort(start, end) {
            console.log([start,end]);
            widgetService.sortWidgets(start,end);
        }
    }
})();