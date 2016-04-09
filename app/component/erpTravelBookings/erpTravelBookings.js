angular.module('sbAdminApp').directive('erpTravelBookings',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpTravelBookings'
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope){
    var travelData = [{}];
    $scope.addMore = function(){
        $scope.travelData.push({});
    }
    $scope.remove = function(index){
        $scope.travelData.splice(index, 1);
    };
    $scope.travelData = travelData;
    $scope.data.model = $scope.travelData;
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
        html += '<div class="add-hotel">' +
                    '<div class="pos-r clearfix" ng-repeat="item in travelData">' +
                        '<div class="col-sm-11 row">' +
                            '<div class="form-group col-sm-6"><label>Travel Mode</label><input placeholder="Train/Flight" class="form-control" ng-model="item.erp_travelType" type="text" /></div>' +
                            '<div class="form-group col-sm-4"><label>Total Cost</label><input class="form-control" type="number" number-converter ng-model="item.erp_travelCost"/></div>' +
                        '</div>' +
                        '<div class="col-sm-1 add-hotel-btn">' +
                            '<button ng-if="!$last" class="btn btn-danger" ng-click="remove($index)"><i class="fa fa-minus"></i></button>' +
                            '<button ng-if="$last" class="btn btn-success" ng-click="addMore()"><i class="fa fa-plus"></i></button>' +
                        '</div>' +
                    '</div>' +
                '</div>';
    return html;
  }
});
