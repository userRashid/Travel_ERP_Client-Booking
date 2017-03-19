(function () {

    'use strict';
    angular
        .module('erp_leads', [])
        .config(config);

    function config($stateProvider) {
        //
        $stateProvider
            .state('leads.add-leads', {
                templateUrl: 'views/leads/add-leads/add-leads.html',
                url: '/add-leads',
                controller: 'addLead'
            }).state('leads.all', {
                templateUrl: 'views/leads/manage-leads/manage-leads.html',
                controller: 'ManageLeadsCtrl',
                url: '/manage-leads'
            }).state('leads.manage-leads', {
                templateUrl: 'views/leads/lead-detail/leads.html',
                url: '/manage-leads/:id',
                controller: 'LeadsCtrl'
            }).state('leads.customers', {
                templateUrl: 'views/customers/customers.html',
                controller: 'CustomersCtrl',
                url: '/customers'
            })
    }

})();