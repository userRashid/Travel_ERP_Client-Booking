(function () {

    'use strict';
    angular
        .module('erp_booking', [])
        .config(config);

    function config($stateProvider) {
        //
        $stateProvider
            .state('booking', {
                templateUrl: 'views/dashboard/main.html',
                url: '/booking'
            }).state('booking.detail', {
                templateUrl: 'views/booking/bookingDetail/bookingDetail.html',
                controller: 'bookingDetailCtrl',
                url: '/manage-booking/:id'
            }).state('booking.manage-booking', {
                templateUrl: 'views/booking/manage-bookings/booking.html',
                controller: 'BookingCtrl',
                url: '/manage-booking'
            }).state('leads.x', {
                templateUrl: 'views/ui-elements/grid.html',
                url: '/x'
            });
    }
})();