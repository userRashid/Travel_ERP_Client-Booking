angular.module('erp_component').directive('erpDateTime',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpDateTime'
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope,GlobalData,$filter){
    var format = GlobalData.getDateTimeFormat();
    $scope.dateId       = "#dropdown2";
    if($scope.data.model == undefined){
        $scope.data.model = $filter('date')(new Date(), format);
    }
    $scope.$watch('data.dateTime',function(data){
        $scope.data.model = $filter('date')(data, format);
    },true)

    $scope.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
        var activeDate = moment(new Date()).subtract(1, $view).add(1, 'minute');
            for (var i = 0; i < $dates.length; i++) {
            if ($dates[i].localDateValue() <= activeDate.valueOf()) {
              $dates[i].selectable = false;
            }
        }
    }
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
   html +='<div class="dropdown">'+
              '<a id="dropdown2" role="button" data-toggle="dropdown" data-target="#" >'+
                '<div class="input-group"><input type="text" class="form-control" data-ng-model=data.model><span class="input-group-addon"><i class="fa fa-calendar"></i></span>'+
                '</div>'+
              '</a>'+
              '<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">'+
                '<datetimepicker  data-before-render="beforeRender($view, $dates, $leftDate, $upDate, $rightDate)" ng-model="data.dateTime" data-datetimepicker-config="{dropdownSelector: dateId , minuteStep : data.minuteStep ,parseFormat :format}"/>'+
              '</ul>'+
        '</div>';
    return html;
  }
});
