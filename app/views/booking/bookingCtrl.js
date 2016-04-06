'use strict';
angular.module('sbAdminApp').controller('BookingCtrl', function($scope,API,Session){
    API.get('bookings').then(function(response){
        $scope.bookings = response.data;
        console.log($scope.bookings);
    })
});
