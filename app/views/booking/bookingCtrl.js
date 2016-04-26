'use strict';
angular.module('sbAdminApp').controller('BookingCtrl', function($scope,BookingService,$uibModal,Notify){
    ////////////////////////////////////////////////
    // Locals

    function makeString(value){
        var name = value.replace(/ /g, "-").toLowerCase();
        return name;
    }

    function makeFilter(data,value){
        var temp = new Array();
        if(data != undefined){
            var len = data.length;
            for(var i=0;i<len;i++){
                if(makeString(data[i].erp_bookingStatus) == makeString(value)){
                    temp.push(data[i]);
                }
            }
        }
        return temp;
    }

    $scope.Date = {
        defaultDate : 0 // 0 for current date -digit for previous date and digit for next date
        ,hidePrevious : true
    };
    $scope.showAll = function(){
        $scope.bookings = $scope.bookingsData;
    }
    $scope.Filter = function(value){
        $scope.bookings = makeFilter($scope.bookingsData,value);
    };
    BookingService.getAllBookings().then(function(response){
        $scope.bookingsData = response;
        console.log('-------------- ',$scope.bookingsData);
        $scope.bookings = response;
    });
    $scope.editStatus = function(item){
        item.editStatusValue = true;
    }
    $scope.cancelStatus = function(item){
        item.editStatusValue = false;
    }
    $scope.doneStatus = function(item){
        if(item.bookingStatus.model == 'Cancel Booking'){
            $scope.open(item);
        } else {
            BookingService.updateBooking(item.erp_bookingId,item.bookingStatus.model).then(function(data){
                item.editStatusValue = false;
                item.erp_bookingStatus = item.bookingStatus.model;
                Notify.add('success','Success',data.message);
            });
        }
    }
    $scope.open = function (item) {
        var modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: function ($scope, $uibModalInstance) {
          $scope.selected = {};
          $scope.ok = function () {
            $uibModalInstance.close($scope.selected);
          };
          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
        },
        resolve: {
                items: function () {
                    return $scope.selected;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
          BookingService.updateBooking(item.erp_bookingId,item.bookingStatus.model).then(function(data){
              item.editStatusValue = false;
              item.erp_bookingStatus = item.bookingStatus.model;
              Notify.add('success','Success',data.message);
          });
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    };
});
