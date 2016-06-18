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

  function makeModel(data){
    var obj = {};
    if(data.hasOwnProperty('erp_bookingStatus') && data.erp_bookingStatus != ''){
        obj.erp_bookingStatus = data.erp_bookingStatus;
    } else {
        obj.erp_bookingStatus = '';
    }

    if(data.hasOwnProperty('erp_bookingAmount') && data.erp_bookingAmount != ''){
        obj.erp_bookingAmount = data.erp_bookingAmount;
    } else {
        obj.erp_bookingAmount = '';
    }
    return obj;
  }

  ///////////////////////////////////////////////////


  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function controller($scope){
    $scope.Data = [];
    $scope.Model = {};
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
    if($scope.data.erpBookingStatus)$scope.Model.erp_bookingStatus = $scope.data.erpBookingStatus
    $scope.$watch('Model',function(model){
        if(model == undefined) return;
        if(model.erp_bookingStatus == 'Token Amount Received'){
            $scope.isBookingAmount = true;
        } else {
            $scope.isBookingAmount = false;
        }
        $scope.data.model = makeModel(model);
    },true);
  }
  function renderHTML(){
    var html = '';
        html +='<div class="form-group">' +
                '<label>Status</label>' +
                    '<select class="form-control" ng-options="item for item in Data" ng-model="Model.erp_bookingStatus">' +
                        '<option value="">{{data.nullValue}}</option>' +
                    '</select>' +
                '</div>' +
                '<div ng-if="isBookingAmount" class="form-group">' +
                    '<label>{{Model.erp_bookingStatus}}</label>' +
                    '<input class="form-control" type="text" ng-model="Model.erp_bookingAmount" />' +
                '</div>';
        return html;
  }
});
