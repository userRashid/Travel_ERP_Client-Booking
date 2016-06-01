'use strict';
angular.module('sbAdminApp').factory('BookingDetailService', function(API,$q){
    return {
        getBooking  :   getBooking
    }

    ////////////////////////////////////////////////
    // Locals



    /////////////////////////////////////////////////

    function getBooking(){
        var q = $q.defer();
        API.get('bookings').then(function(response){
            q.resolve(createIsShow(response.data));
        });
        return q.promise;
    }

});
