angular.module('sbAdminApp').directive('erpDateRange',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpDateRange'
    }
    //,replace :true
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
    html +='<div style="float:left">';
      html +='<div class="col-lg-6">';
        html +='<label>Start Date</label>';
        html +='<ng-datepicker  format="DD/MM/YYYY" ng-model="startDate"></ng-datepicker>';
      html +='</div>';
      html +='<div class="col-lg-6">';
        html +='<label>End Date</label>';
        html +='<ng-datepicker  format="DD/MM/YYYY" ng-model="endDate"></ng-datepicker>';
      html +='</div>';
     html +='</div>';
    return html;
  }
});
