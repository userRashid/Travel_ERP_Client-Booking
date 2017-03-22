(function () {

    'use strict';
    angular
        .module('erp_navigation', [])
        .config(config);

    function config() {
        //
    }
})();
(function () {

    'use strict';
    angular
        .module('erp_navigation')
        .directive('sidebar', Sidebar);

    function Sidebar($location, Session) {

        return {
            templateUrl: 'navigation/sidebar/sidebar.html',
            restrict: 'E',
            replace: true,
            scope: {
                _data: '='
            },
            controller: _controller,
            link: _link
        }

        function _controller($scope) {
            $scope.selectedMenu = 'dashboard';
            $scope.collapseVar = 0;
            $scope.multiCollapseVar = 0;

            $scope.check = function (x) {

                if (x == $scope.collapseVar)
                    $scope.collapseVar = 0;
                else
                    $scope.collapseVar = x;
            };

            $scope.multiCheck = function (y) {

                if (y == $scope.multiCollapseVar)
                    $scope.multiCollapseVar = 0;
                else
                    $scope.multiCollapseVar = y;
            };

            $scope.showNavigation = function (conditions) {
                return conditions.some(function (item) {
                    var permissions = JSON.parse(Session.get('permission'));
                    return permissions.indexOf(item) != -1;
                });
            }
        }

        function _link($scope, element, attr) {
            //element.html('').append($compile(_renderHTML())($scope));
        }

        function _renderHTML() {
            var html = '<h1>Hello</h1>';
            return html;
        }

    }
})();