(function () {
    'use strict';
    angular
        .module('erp_customer')
        .controller('CustomersCtrl', CustomersCtrl)
    function CustomersCtrl($scope, API, Session) {
        //http://104.236.94.240:8080/Travel_ERP/customers
        API.get('customers?createdBy=' + Session.get('id')).then(function (response) {
            $scope.customers = response.data;
        })
        $scope.placement = 'top';
    };

})();