angular.module('sbAdminApp').directive('erpDateRange',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpDateRange'
    }
    //,replace :true
    ,link : link
    ,controller : controller
    //,controllerAs : 'rashid'
  }

  function controller($scope){
    $scope.popupFirst = {
        opened: false
    };
    $scope.openFirst = function() {
        $scope.popupFirst.opened = true;
    };
    $scope.popupTwo = {
        opened: false
    };
    $scope.openTwo = function() {
        $scope.popupTwo.opened = true;
    };
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
    html +='<div style="float:left">';
      html +='<div class="col-lg-6">';
        html +='<p class="input-group">' +
                   '<input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="popupFirst.model" is-open="popupFirst.opened" show-button-bar="false" datepicker-options="dateOptions" ng-required="true" />' +
                   '<span class="input-group-btn">' +
                     '<button type="button" class="btn btn-default" ng-click="openFirst()"><i class="fa fa-calendar"></i></button>' +
                   '</span>' +
                 '</p>';
      html +='</div>';
      html +='<div class="col-lg-6">';
      html +='<p class="input-group">' +
                 '<input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="popupTwo.model" is-open="popupTwo.opened" show-button-bar="false" datepicker-options="dateOptions" ng-required="true" />' +
                 '<span class="input-group-btn">' +
                   '<button type="button" class="btn btn-default" ng-click="openTwo()"><i class="fa fa-calendar"></i></button>' +
                 '</span>' +
               '</p>';
    html +='</div>';
     html +='</div>';
    return html;
  }
});
