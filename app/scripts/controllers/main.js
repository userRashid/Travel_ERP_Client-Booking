'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope, Session) {
    $scope.customers = Session.get('customerCount');
    $scope.leads =   Session.get('leadCount');
    $scope.bookings =   Session.get('bookingCount');
  });
