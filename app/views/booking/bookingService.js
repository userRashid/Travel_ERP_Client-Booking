'use strict';
angular.module('sbAdminApp').factory('BookingService', function(API,Session,$q,GlobalData){
    return {
        getAllBookings  :   getAllBookings
        ,updateBooking  :   updateBooking
    }

    ////////////////////////////////////////////////
    // Locals

    function createIsShow(data){
        var len = data.length;
        for(var i=0;i<len;i++){
            data[i].isShow = true;
            data[i].bookingStatus = {name : 'erp_bookingStatus'
                                           ,values : GlobalData.getBookingStatus('cancel')
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
    //http://104.236.94.240:8080/Travel_ERP/booking/{bookingId}/status?bookingStatus={status}
    function updateBooking(bookingId,status){
        var q = $q.defer();
        API.put('booking/'+bookingId+'/status?bookingStatus='+status).then(function(response){
            q.resolve(response.data);
        },function(error){
            q.reject(error)
        });
        return q.promise;
    }
});
