'use strict';
angular.module('sbAdminApp').directive('erpNote',function($compile,ErpNodeServices,API,Notify,Session,FormData){
  return {
    restrict : 'A'
    ,scope : {
      options : '=erpNote'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  };

  function controller($scope){
    $scope.options.promise = ErpNodeServices.createForm(FormData.addNote());
  }
  function renderHTML(){
    var html = '';
    html = '<div>' +
                '<div class="clearfix" style="margin-top:10px;" data-form-builder="options.promise"></div>' +
            '</div>';
    return html;
  }
});












