angular.module('sbAdminApp').directive('erpEmail',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpEmail'
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope){

  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
        html +='<md-input-container class="md-block"><label>{{data.innerLabel}}</label><input ng-model="data.model" ng-disabled="data.isDisable" type="email" ></md-input-container>';
    return html;
  }
});
