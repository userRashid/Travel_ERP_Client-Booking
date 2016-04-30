angular.module('sbAdminApp').directive('erpText',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpText'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function controller($scope){
    if($scope.data.isDisable == undefined) $scope.data.isDisable = false;
    if($scope.data.watch == undefined) $scope.data.isShow = true;
  }
  function renderHTML(){
    var html = '';
    html +='<input type="text" ng-if="data.isShow" ng-model="data.model" ng-disabled="data.isDisable" class="form-control">';
    return html;
  }
});
