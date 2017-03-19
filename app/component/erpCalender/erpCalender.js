angular.module('erp_component').directive('erpCalender',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpCalender'
    }
    ,link : link
    ,controller : controller
  }

  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }

  function controller($scope,GlobalData){
    //$scope.dt = new Date();
    $scope.format = GlobalData.getDateFormat();
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        startingDay: 1,
        showWeeks : false
    };
    if($scope.data.hidePrevious){
      $scope.dateOptions.minDate = new Date()
    } else {
      $scope.dateOptions.minDate = new Date(1950, 5, 22)
    }
    if($scope.data.model == undefined){
      var d = new Date()
          ,date = d.getDate()
          ,month = d.getMonth()
          ,year = d.getFullYear()+($scope.data.defaultDate);
      $scope.data.model = new Date(year,month,date);
    }
    $scope.popup = {
        opened: false
    };
    $scope.open = function() {
        $scope.popup.opened = true;
    };
  }
  function renderHTML(){
    var html = '';
      html +='<p class="input-group">' +
                '<input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="data.model" is-open="popup.opened" show-button-bar="false" datepicker-options="dateOptions" ng-required="true" />' +
                '<span class="input-group-btn">' +
                  '<button type="button" class="btn btn-default" ng-click="open()"><i class="fa fa-calendar"></i></button>' +
                '</span>' +
              '</p>';
    return html;
  }
});
