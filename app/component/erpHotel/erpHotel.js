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
    var hotelData = [{checkin: {
                              start : {label : 'Checkin' },
                              end   : {label : 'Checkout'}
                               }
                     }];
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
      //  SetRoom(data);
    });
    $scope.remove = function(index){
        $scope.hotelData.splice(index, 1);
    };
    if($scope.data.model){
        $scope.hotelData = $scope.data.model;
    }else{
        $scope.hotelData = hotelData;
        $scope.data.model = $scope.hotelData;
    }
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
        html += '<div class="add-hotel">' +
                    '<div class="pos-r clearfix p5" ng-repeat="item in hotelData" ng-class="{\'odd\':$odd}">' +
                        '<div class="col-sm-11 row">' +
                            '<div class="form-group col-sm-3"><label>Name</label><input class="form-control" ng-model="item.erp_hotelName" type="text" /></div>' +
                            '<div class="form-group col-sm-2"><label>Hotel Category</label>' +
                                '<select class="form-control" ng-model="item.erp_hotelCategory">' +
                                    '<option value="2 Star">2 Star</option>' +
                                    '<option value="3 Star">3 Star</option>' +
                                    '<option value="4 Star">4 Star</option>' +
                                    '<option value="5 Star">5 Star</option>' +
                                '</select>' +
                            '</div>' +
                            '<div class="form-group col-sm-2"><label>Room Count</label>' +
                                '<input class="form-control" type="number" ng-model="item.erp_roomCount" />' +
                            '</div>' +
                            '<div class="form-group col-sm-2"><label>Room Type</label>' +
                                '<select class="form-control" ng-model="item.erp_roomType">' +
                                    '<option value="Deluxe">Deluxe</option>' +
                                    '<option value="Super Deluxe">Super Deluxe</option>' +
                                    '<option value="Luxury">Luxury</option>' +
                                    '<option value="Executive">Executive</option>' +
                                    '<option value="Family Suite">Family Suite</option>' +
                                    '<option value="Family Room">Family Room</option>' +
                                    '<option value="Honeymoon Suite">Honeymoon Suite</option>' +
                                    '<option value="Standard">Standard</option>' +
                                    '<option value="Others">Others</option>' +
                                '</select>' +
                            '</div>' +

                            '<div class="form-group col-sm-3"><label>Meal Plan</label>' +
                                '<select class="form-control" ng-model="item.erp_mealPlan">' +
                                    '<option value="CP">CP</option>' +
                                    '<option value="MAP">MAP</option>' +
                                    '<option value="EP">EP</option>' +
                                    '<option value="API">API</option>' +
                                '</select>' +
                            '</div>' +
                            //'<div class="form-group col-sm-3"><label>Room Cost</label><input class="form-control" type="number" number-converter ng-model="item.erp_roomCost" /></div>' +
                            '<div class="form-group col-sm-6">' +
                                '<div erp-date-range="item.checkin" start-model="item.erp_checkinDate"  end-model="item.erp_checkoutDate" ></div>' +
                                //'<label>Nights Of Stay</label><input class="form-control" type="number" ng-model="item.erp_nightsOfStay" />' +
                            '</div>' +
                            '<div class="form-group col-sm-6"><label>Inclusions</label><textarea class="form-control" ng-model="item.erp_inclusions" ></textarea></div>' +
                        '</div>' +
                        '<div class="col-sm-1 add-hotel-btn form-group">' +
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
