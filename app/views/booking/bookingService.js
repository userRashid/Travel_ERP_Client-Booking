'use strict';
angular.module('sbAdminApp').factory('BookingService', function(API,Session,$q,GlobalData){
    return {
        getAllBookings  :   getAllBookings
        ,updateBooking  :   updateBooking
        ,fillerBooking  :   fillerBooking
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

    function dateFormat(date){
        return moment(date).format('DD/MM/YYYY')
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
    function updateBooking(item,model){
        var q = $q.defer();
        API.put('booking/'+item.erp_bookingId+'/status?bookingStatus='+item.bookingStatus.model,model).then(function(response){
            q.resolve(response.data);
        },function(error){
            q.reject(error)
        });
        return q.promise;
    }

    function fillerBooking(model){
        var q = $q.defer()
            ,startDate  =    dateFormat(model.start)
            ,endDate    =    dateFormat(model.end);
        API.get('bookings?fromDate='+startDate+'&toDate'+endDate).then(function(response){
            q.resolve(createIsShow(response.data));
        });
        return q.promise;
    };

});
