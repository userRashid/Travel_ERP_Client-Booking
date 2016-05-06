angular.module('sbAdminApp').directive('erpBookingStatus',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpBookingStatus'
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
    $scope.Data = [];
    if($scope.data.isDisable == undefined) $scope.data.isDisable = false;
    $scope.data.nullValue = $scope.data.nullValue || '-- Make Selection --';
    if(angular.isArray($scope.data.values)) {
      $scope.Data = $scope.data.values;
    } else {
      $scope.$watch('data.values',function(value){
        value.then(function (possibleValues) {
          $scope.Data = possibleValues;
        });
      });
    }
    $scope.isBookingAmount = false;
    $scope.$watch('data.model',function(model){
        if(model == undefined) return;

        if(model == 'Token Amount Received'){
            $scope.isBookingAmount = true;
        } else {
            $scope.isBookingAmount = false;
        }

    });
  }
  function renderHTML(){
    var html = '';
    html += '<div class="form-group"><label>Status</label>' +
              '<select class="form-control" ng-disabled="data.isDisable" ng-options="item for item in Data" ng-model="data.model">' +
                '<option value="">{{data.nullValue}}</option>' +
              '</select></div>' +
              '<div ng-if="isBookingAmount" class="form-group"><label>{{data.model}}</label>' +
                                            '<input class="form-control" type="text" /></div>';
    return html;
  }
});
