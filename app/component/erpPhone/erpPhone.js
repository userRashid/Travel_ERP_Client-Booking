angular.module('sbAdminApp').directive('erpPhone',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpPhone'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function controller($scope){
  }
  function renderHTML(){
    var html = '';
        html +='<div class="input-group">' +
                '<span ng-if="data.code" class="input-group-addon">{{data.code}}</span>' +
                '<input type="text" ng-model="data.model" class="form-control">' +
            '</div>';
    return html;
  }
});
