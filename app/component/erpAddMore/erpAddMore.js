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
    if($scope.options.model == undefined) $scope.model = 0;
    else $scope.model = $scope.options.model;
    $scope.$watch('model',function(d){
        if(d == undefined) return;
        $scope.options.model = d;
        if($scope.options.watch != undefined) $scope.options.watch.setRooms(d);
    });
    $scope.add = function(){
        $scope.model++;
    }
    $scope.remove = function(){
        $scope.model--;
    }
  }
  function renderHTML(){
    var html = '';
    html = '<div class="addMore">' +
                '<button ng-click="remove()" ng-disabled="model == 0" class="fa fa-minus btn-info"></button>' +
                '<input class="form-control" type="input" ng-model="model" />' +
                '<button ng-click="add()" class="fa fa-plus btn-success"></button>' +
            '</div>';
    return html;
  }
});












