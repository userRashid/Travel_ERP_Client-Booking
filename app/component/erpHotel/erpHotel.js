angular.module('sbAdminApp').directive('erpHotel',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpHotel'
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope,Watch){
    var hotelData = [{}];
    $scope.addMore = function(){
        $scope.hotelData.push({});
    }
    $scope.Watch = Watch;
    function SetRoom(count){
        var data    = $scope.hotelData
            ,len    = data.length;
        for(var i=0;i<len;i++){
            data[i].erp_roomCount = count;
        }
    };
    $scope.$watch('Watch.getRooms()',function(data){
        SetRoom(data);
    });
    $scope.remove = function(index){
        $scope.hotelData.splice(index, 1);
    };
    $scope.hotelData = hotelData;
    $scope.data.model = $scope.hotelData;
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
        html += '<div class="add-hotel">' +
                    '<div class="pos-r clearfix" ng-repeat="item in hotelData">' +
                        '<div class="col-sm-11 row">' +
                            '<div class="form-group col-sm-6"><label>Name</label><input class="form-control" ng-model="item.erp_hotelName" type="text" /></div>' +
                            '<div class="form-group col-sm-6"><label>Room Type</label>' +
                                '<input class="form-control" type="text" ng-model="item.erp_roomType" />' +
                            '</div>' +
                            '<div class="form-group col-sm-6"><label>Hotel Category</label><input class="form-control" ng-model="item.erp_hotelCategory" type="text" /></div>' +
                            '<div class="form-group col-sm-6"><label>Meal Plan</label><input class="form-control" ng-model="item.erp_mealPlan" type="text" /></div>' +
                            '<div class="form-group col-sm-12"><label>Inclusions</label><textarea class="form-control" ng-model="item.erp_hotelInclusions" ></textarea></div>' +
                            '<div class="form-group col-sm-4"><label>Room Cost</label><input class="form-control" type="number" number-converter ng-model="item.erp_roomCost" /></div>' +
                            '<div class="form-group col-sm-4"><label>Room Count</label>' +
                                '<input class="form-control" type="number" ng-model="item.erp_roomCount" />' +
                            '</div><div class="form-group col-sm-4"><label>Nights Of Stay</label>' +
                                '<input class="form-control" type="number" ng-model="item.erp_nightsOfStay" />' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-sm-1 add-hotel-btn">' +
                            '<button ng-if="!$last" class="btn btn-danger" ng-click="remove($index)"><i class="fa fa-minus"></i></button>' +
                            '<button ng-if="$last" class="btn btn-success" ng-click="addMore()"><i class="fa fa-plus"></i></button>' +
                        '</div>' +
                    '</div>' +
                '</div>';
    return html;
  }
}).directive('numberConverter', function() {
    return {
      priority: 1,
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ngModel) {
        function toModel(value) {
          return "" + value; // convert to string
        }

        function toView(value) {
          return parseInt(value); // convert to number
        }

        ngModel.$formatters.push(toView);
        //ngModel.$parsers.push(toModel);
      }
    };
  });;
