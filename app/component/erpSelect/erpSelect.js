angular.module('sbAdminApp').directive('erpSelect',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpSelect'
    }
    ,link : link
    ,controller : controller
  }

  /////////////////////////////////////////////////////////
  //Locals
  function setModel(name,data){
    var len = data.length;
    for(var i=0;i<len;i++){
      if(data[i].value == name) return data[i];
    }
  };
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function controller($scope){
    /*$scope.data.values.then(function(_d){
      $scope.Data = _d;
      if($scope.data.model){
        $scope.data.model = setModel($scope.data.model,_d);
      } else {
        $scope.data.model = $scope.Data[0];
      }
    });*/
    $scope.Data = [];
    if($scope.data.isDisable == undefined) $scope.data.isDisable = false;
    $scope.data.nullValue = $scope.data.nullValue || '-- Make Selection --';
    if(angular.isArray($scope.data.values)) {
      $scope.Data = $scope.data.values;
    } else {
      $scope.$watch('data.values',function(value){
        value.then(function (possibleValues) {
          //console.log('possibleValues  --- ',possibleValues)
          $scope.Data = possibleValues;
        });
      });
    }
  }
  function renderHTML(){
    var html = '';
    html += '<select class="form-control" ng-disabled="data.isDisable" ng-options="item for item in Data" ng-model="data.model">' +
              '<option value="">{{data.nullValue}}</option>' +
            '</select>';
    return html;
  }
});
