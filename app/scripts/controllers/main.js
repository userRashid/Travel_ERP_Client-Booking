'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,API) {
    API.get('customers').then(function(response){
        $scope.customers = response.data.length;
    });
    API.get('lead').then(function(response){
        $scope.leads =   response.data.length
    });


  });
