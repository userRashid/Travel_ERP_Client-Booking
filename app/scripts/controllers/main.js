'use strict';
/**
 * @ngdoc function
 * @description
 * # MainCtrl
 */
angular.module('erp_core')
  .controller('MainCtrl', function($scope, Session) {
    $scope.customers = Session.get('customerCount');
    $scope.leads =   Session.get('leadCount');
    $scope.bookings =   Session.get('bookingCount');
  });
