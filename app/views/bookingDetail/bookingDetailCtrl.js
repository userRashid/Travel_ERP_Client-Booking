//'use strict';
angular.module('sbAdminApp').controller('bookingDetailCtrl', function($scope,$stateParams,BookingDetailService){
    $scope.bookingId = $stateParams.id;
    BookingDetailService.getBooking($stateParams.id).then(function(data){
        console.log(data);
        $scope.conversionData = data;
    });
});
