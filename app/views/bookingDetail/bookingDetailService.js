(function () {

    'use strict';
    angular
        .module('erp_booking')
        .factory('BookingDetailService', BookingDetailService)
    function BookingDetailService(API, $q) {
        return {
            getBooking: getBooking
        }

        ////////////////////////////////////////////////
        // Locals



        /////////////////////////////////////////////////

        function getBooking(id) {
            var q = $q.defer();
            API.get('booking/' + id).then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        }

    };

})()