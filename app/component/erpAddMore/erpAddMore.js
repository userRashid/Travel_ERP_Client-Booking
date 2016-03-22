'use strict';
angular.module('sbAdminApp').directive('erpAddMore',function($compile,ErpNodeServices,API,Notify,Session,FormData){
  return {
    restrict : 'A'
    ,scope : {
      options : '=erpAddMore'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  };

  function controller($scope){
    $scope.$watch('options',function(d){
        $scope.options = d;
    });
    $scope.add = function(){
        $scope.options++;
    }
    $scope.remove = function(){
        $scope.options--;
    }
  }
  function renderHTML(){
    var html = '';
    html = '<div class="addMore">' +
                '<button ng-click="add()" class="fa fa-plus btn-success"></button>' +
                '<input class="form-control" type="input" ng-model="options" />' +
                '<button ng-click="remove()" ng-disabled="options == 0" class="fa fa-minus btn-info"></button>' +
            '</div>';
    return html;
  }
});












