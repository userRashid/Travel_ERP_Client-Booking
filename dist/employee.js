(function () {

    'use strict';
    angular
        .module('erp_employee', [])
        .config(config);

    function config() {
        //
    }
})();
(function () {
    angular
        .module('erp_employee')
        .controller('AddEmployeeCtrl', AddEmployee);

    function AddEmployee($scope, ErpNodeServices, FormData, API, Notify) {

        $scope.AddEmployee = ErpNodeServices.createForm(FormData.employee());
        $scope.addEmployee = function () {
            $scope.AddEmployee.promise.then(function (data) {
                var model = data.getModel();
                API.post('employee',model).then(function (response) {
                    Notify.add('success', 'Success', response.data.message);
                });
            })
        }

    }
})();
(function () {
    angular
        .module('erp_employee')
        .controller('AssignLeadsCtrl', AssignLeads);

    function AssignLeads() {
        var vm = this;

    }
})();
(function () {
    angular
        .module('erp_employee')
        .controller('ManageEmployeeCtrl', ManageEmployee);

    function ManageEmployee(Session,$scope) {
        var vm = this;
        $scope.employeeData = JSON.parse(Session.get('employee'));
        $scope.editEmployee = function (empId) {
            console.log('Edit -- ',empId);
        }

        $scope.deleteEmployee = function (empId) {
            console.log('Delete -- ',empId);
        }

        $scope.reSetPassword = function (empId) {
            console.log('Reset -- ',empId);
        }
    }
})();