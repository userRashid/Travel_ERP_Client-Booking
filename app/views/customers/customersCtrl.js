'use strict';
angular.module('sbAdminApp').controller('CustomersCtrl', function($scope,API,Session){
//http://104.236.94.240:8080/Travel_ERP/customers
    API.get('customers?createdBy='+Session.get('id')).then(function(response){
        $scope.customers = response.data;
    })
});
