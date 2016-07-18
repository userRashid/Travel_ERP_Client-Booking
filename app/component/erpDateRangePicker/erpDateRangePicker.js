angular.module('sbAdminApp').directive('erpDateRangePicker',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpDateRangePicker'
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
    html +='<div><input date-range-picker class="form-control date-picker" type="text"   ng-model="data.date" options="data.opts" required /></div>';
    return html;
  }
});

