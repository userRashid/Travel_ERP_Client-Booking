angular.module('sbAdminApp').directive('erpDateTime',function($compile){
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
    $scope.dateId = "#dropdown2";
    if($scope.data.model == undefined){
        $scope.data.model = $filter('date')(new Date(), format);
    }
    $scope.$watch('data.model',function(data){
        $scope.data.model = $filter('date')(data, format);
    },true)
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
   html +='<div class="dropdown">'+
              '<a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#" >'+
                '<div class="input-group"><input type="text" class="form-control" data-ng-model=data.model><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>'+
                '</div>'+
              '</a>'+
              '<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">'+
                '<datetimepicker  ng-model="data.model" data-datetimepicker-config="{dropdownSelector: dateId}"/>'+
              '</ul>'+
        '</div>';
    return html;
  }
});
