'use strict';
angular.module('sbAdminApp').factory('BookingService', function(API,Session,$q,GlobalData){
    return {
        getAllBookings  :   getAllBookings
    }

    ////////////////////////////////////////////////
    // Locals

    function createIsShow(data){
        var len = data.length;
        for(var i=0;i<len;i++){
            data[i].isShow = true;
            data[i].bookingStatus = {name : 'erp_bookingStatus'
                                           ,values : GlobalData.getBookingStatus()
                                           ,model : data[i].erp_bookingStatus};
            data[i].editStatusValue = false;
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