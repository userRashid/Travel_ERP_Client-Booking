'use strict';
angular.module('sbAdminApp').factory('BookingService', function(API,Session,$q){
    return {
        getAllBookings  :   getAllBookings
    }

    ////////////////////////////////////////////////
    // Locals

    function createIsShow(data){
        var len = data.length;
        for(var i=0;i<len;i++){
            data[i].isShow = true;
        }
        return data;
    }

    /////////////////////////////////////////////////

    function getAllBookings(){
        var q = $q.defer();
        API.get('bookings').then(function(response){
            q.resolve(createIsShow(response.data));
        });
        return q.promise;
    }
});
