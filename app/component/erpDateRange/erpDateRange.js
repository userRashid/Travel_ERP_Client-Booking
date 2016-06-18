angular.module('sbAdminApp').directive('erpDateRange',function($compile,$filter){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpDateRange'
      ,startModel : '='
      ,endModel : '='
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope,GlobalData){
    $scope.format = GlobalData.getDateFormat();
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        startingDay: 1,
        showWeeks : false
    };
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

    $scope.$watch('data',function(values){
        if(!values) return
        if(values.start.model)$scope.startModel = $filter('date')(values.start.model, $scope.format);
        if(values.end.model)$scope.endModel = $filter('date')(values.end.model, $scope.format);;

    },true);
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
    html +='<div style="float:left" class="row">';
      html +='<div class="col-lg-6">' +
             '<label ng-if="data.start.label">{{data.start.label}}</label>' ;
        html +='<p class="input-group">' +
                   '<input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="data.start.model" is-open="popupFirst.opened" show-button-bar="false" datepicker-options="dateOptions" ng-required="true" />' +
                   '<span class="input-group-btn">' +
                     '<button type="button" class="btn btn-default" ng-click="openFirst()" style="padding:2px 4px 1px"><i class="fa fa-calendar"></i></button>' +
                   '</span>' +
                 '</p>';
      html +='</div>';
      html +='<div class="col-lg-6">' +
             '<label ng-if="data.end.label">{{data.end.label}}</label>' ;
      html +='<p class="input-group">' +
                 '<input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="data.end.model" is-open="popupTwo.opened" show-button-bar="false" datepicker-options="dateOptions" ng-required="true" />' +
                 '<span class="input-group-btn">' +
                   '<button type="button" class="btn btn-default" ng-click="openTwo()"  style="padding:2px 4px 1px"><i class="fa fa-calendar"></i></button>' +
                 '</span>' +
               '</p>';
    html +='</div>';
     html +='</div>';
    return html;
  }
});
