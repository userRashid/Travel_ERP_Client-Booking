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