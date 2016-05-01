'use strict';
angular.module('sbAdminApp').directive('erpAttach',function($compile,ErpNodeServices,API,Notify,Session,FormData){
  return {
    restrict : 'A'
    ,scope : {
      options : '=erpAttach'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  };

  function controller($scope){
    $scope.data = ErpNodeServices.createForm(FormData.addNote());
    $scope.options.promise = $scope.data.promise;
  }
  function renderHTML(){
    var html = '';
    html = '<div>' +
                '<div class="clearfix" style="margin-top:10px;" data-form-builder="options.promise"></div>' +
            '</div>';
    return html;
  }
});












