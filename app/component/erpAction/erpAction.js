(function () {
    angular
        .module('erp_component')
        .directive('erpAction', erpAction);

    function erpAction($compile, Session) {

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

        function checkPermission(permissionName) {
            var permissions = JSON.parse(Session.get('permission'));
            var isShow = permissions.indexOf(permissionName) != -1;
            return isShow;
        }

        function link($scope, element, attr) {
            var permission = checkPermission($scope.name);
            element.replaceWith($compile(renderHTML($scope.type, $scope.label, permission))($scope));
        };

        function controller() {

        }

        function renderHTML(type, label, permission) {
            var html = '';
            if (permission && type === 'button') html += '<button class="{{css}}" ng-click="action(data)">' + label + '</button>';
            if (permission && type === 'link') html += '<a href="{{link}}" class="{{css}}">' + label + '</a>';
            if (permission && type === 'nav') html += '<a class="{{css}}" ui-sref="{{link}}">' + label + '</a>';
            return html;
        }
    }
})();