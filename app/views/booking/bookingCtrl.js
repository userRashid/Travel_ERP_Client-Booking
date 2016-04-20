'use strict';
angular.module('sbAdminApp').controller('BookingCtrl', function($scope,BookingService){
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
        $scope.bookings = response;
    });
    $scope.editStatus = function(item){
        item.editStatusValue = true;
    }
    $scope.cancelStatus = function(item){
        item.editStatusValue = false;
    }
});
