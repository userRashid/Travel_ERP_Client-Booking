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

  }
  function renderHTML(){
    var html = '';
    html +='<input type="text">';
    return html;
  }
});
