(function () {
    angular
        .module('erp_component')
        .directive('erpAction', erpAction);

    function erpAction($compile) {

        return {
            restrict: 'E'
            , replace: true
            , scope: {
                label: '@'
                , type: '@'
                , name: '@'
                , action: '&'
                , css: '@'
                , link: '@'
            }
            , link: link
            , controller: controller
        }
        function link($scope, element, attr) {
            element.replaceWith($compile(renderHTML($scope.type, $scope.label))($scope));
        };

        function controller() {

        }

        function renderHTML(type, label) {
            var html = '';
            if (type === 'button') html += '<button class="{{css}}" ng-click="action()">' + label + '</button>';
            if (type === 'link') html += '<a href="{{link}}" class="{{css}}">' + label + '</a>';
            return html;
        }
    }
})();