(function () {

    'use strict';
    angular
        .module('erp_employee', [])
        .config(config);

    function config($stateProvider) {
        //
        $stateProvider.state('employee', {
            templateUrl: 'views/dashboard/main.html',
            url: '/employee'
        }).state('employee.add-employee', {
            templateUrl: 'views/employee/add-employee/add-employee.html',
            controller: 'AddEmployeeCtrl',
            url: '/add-employee'
        }).state('employee.manage-employee', {
            templateUrl: 'views/employee/manage-employee/manage-employee.html',
            controller: 'ManageEmployeeCtrl',
            url: '/manage-employee'
        }).state('employee.manage-detail', {
            templateUrl: 'views/employee/add-employee/add-employee.html',
            controller: 'AddEmployeeCtrl',
            url: '/manage-employee/:empId'
        }).state('employee.assign-leads', {
            templateUrl: 'views/employee/assign-leads/assign-leads.html',
            controller: 'AssignLeadsCtrl',
            url: '/assign-leads'
        });
    }
})();