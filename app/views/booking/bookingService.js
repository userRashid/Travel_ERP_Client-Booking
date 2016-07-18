'use strict';
angular.module('sbAdminApp').factory('BookingService', function(API,Session,$q,GlobalData,Authenticate){
    return {
        getAllBookings  :   getAllBookings
        ,updateBooking  :   updateBooking
        ,fillerBooking  :   fillerBooking
    }

    ////////////////////////////////////////////////
    // Locals
    function checkUser(userId){
        return superAdminIds.indexOf(userId) !== -1;
    }

    function createIsShow(data){
        var len = data.length
            ,userId = Authenticate.user().id
            ,temp = new Array();
        for(var i=0;i<len;i++){
            data[i].isShow = true;
            data[i].bookingStatus = {
                                        name : 'erp_bookingStatus'
                                        ,values : GlobalData.getBookingStatus('cancel')
                                        ,model : data[i].erp_bookingStatus
                                    };
            data[i].editStatusValue = false;
            temp.push(data[i]);
        }
        return temp;
    }

    function dateFormat(date){
        return moment(date).format('DD/MM/YYYY')
    }

    /////////////////////////////////////////////////

    function getAllBookings(){
        var q = $q.defer()
            ,url = ''
            ,userId = Authenticate.user().id;
        if(superAdminIds.indexOf(userId) !== -1){
            url = API.get('bookings');
        } else {
            url = API.get('bookings?assignTo='+userId);
        }
        url.then(function(response){
            q.resolve(createIsShow(response.data));
        });
        return q.promise;
    }
    //http://104.236.94.240:8080/Travel_ERP/booking/{bookingId}/status?bookingStatus={status}
    function updateBooking(item,model){
        var q = $q.defer();
        var url = '';
        if(item.hasOwnProperty('erp_bookingAmount') && item.erp_bookingAmount != ''){
            url = API.put('booking/'+item.erp_bookingId+'/status?bookingStatus='+item.erp_bookingStatus+'&tokenAmount='+item.erp_bookingAmount,model);
        } else {

            url = API.put('booking/'+item.erp_bookingId+'/status?bookingStatus='+item.erp_bookingStatus,model);
        }
        url.then(function(response){
            q.resolve(response.data);
        },function(error){
            q.reject(error)
        });
        return q.promise;
    }

    function fillerBooking(model){
        var q = $q.defer()
            ,startDate  =    dateFormat(model.startDate._d)
            ,endDate    =    dateFormat(model.endDate._d)
            ,_url = Authenticate.isAdmin() ? '' : '&salesPersonId='+Authenticate.user().id;
        console.log(_url);
        API.get('bookings?fromDate='+startDate+'&toDate='+endDate+_url).then(function(response){
            q.resolve(createIsShow(response.data));
        });
        return q.promise;
    };

});
