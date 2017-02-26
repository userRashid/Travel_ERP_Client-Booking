(function () {
    'use strict';
    angular.module('erp_component')
        .directive('erpAssign', ErpAssign);
    function ErpAssign($compile) {

        function _link($scope, element, attr) {
            element.html('').append($compile(_renderHTML())($scope));
        }

        function _controller($scope) {
            /////////////////////////////////////////////
            // Locals
            /////////////////////////////////////////////

            function _gatSelected(items) {
                var selectedData = items.filter(function (item) {
                    return item.isSelected === true;
                });
                return selectedData;
            }

            function _appendSelected(entities) {
                var newEntities = [];
                angular.forEach(entities, function (entity) {
                    var appended = entity;
                    appended.isSelected = false;
                    newEntities.push(appended);
                });
                return newEntities;
            }

            function _filterOut(original, toFilter) {
                var filtered = [];
                angular.forEach(original, function (entity) {
                    var match = false;
                    for (var i = 0; i < toFilter.length; i++) {
                        if (toFilter[i].label === entity.label) {
                            match = true;
                            break;
                        }
                    }
                    if (!match) {
                        filtered.push(entity);
                    }
                });
                return filtered;
            }


            /////////////////////////////////////////////

            var selected = {
                available: [],
                current: []
            };

            $scope.options.available.then(function (_data) {
                $scope.available = _data;
            });

            $scope.options.assign.then(function (_data) {
                $scope.model = _data;
            });

            $scope.removeValues = function () {
                var removeValues = _gatSelected($scope.model);
                $scope.available = _appendSelected($scope.available.concat(removeValues));
                $scope.model = _appendSelected(_filterOut($scope.model, $scope.available));
                $scope.createModel();
            }

            $scope.assignValues = function () {
                var selectedValues = _gatSelected($scope.available);
                $scope.model = _appendSelected($scope.model.concat(selectedValues));
                $scope.available = _appendSelected(_filterOut($scope.available, $scope.model));
                $scope.createModel();
            }

            $scope.makeButtonDisabled = function (data) {
                var found = new Array();
                if (data === undefined) return true;
                data.forEach(function (item) {
                    if (item.isSelected) {
                        found.push(item);
                    }
                });
                return found;
            };

            $scope.createModel = function () {
                var _model = new Array();
                $scope.model.forEach(function (item) {
                    _model.push(item.id);
                })
                $scope.options.model = _model;
            }
        }

        return {
            restrict: 'A'
            , scope: {
                options: '=erpAssign'
            }
            , link: _link
            , controller: _controller
        }

        function _renderHTML() {
            var html = '';
            html = '<div class="clearfix">' +
                '<div class="assign">' +
                '<b>Available ({{available.length}})</b>' +
                '<ul>' +
                '<li ng-repeat="item in available" class="checkbox">' +
                '<label><input type="checkbox" ng-model="item.isSelected" value="">&nbsp;{{item.label}}</label>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '<div class="assign-button">' +
                '<button class="btn btn-danger" ng-click="assignValues()" ng-disabled="!makeButtonDisabled(available).length"><i class="fa fa-chevron-right"></i></button>' +
                '<br />' +
                '<button class="btn btn-danger" ng-click="removeValues()" ng-disabled="!makeButtonDisabled(model).length"><i class="fa fa-chevron-left"></i></button>' +
                '</div>' +
                '<div class="assign">' +
                '<b>Assign ({{model.length}})</b>' +
                '<ul class="list-group">' +
                '<li ng-repeat="item in model">' +
                '<label><input type="checkbox" ng-model="item.isSelected" value="">&nbsp;{{item.label}}</label>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</div>';
            return html;
        }
    }
})();