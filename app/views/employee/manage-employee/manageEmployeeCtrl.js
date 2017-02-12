(function () {
    angular
        .module('erp_employee')
        .controller('ManageEmployeeCtrl', ManageEmployee);

    function ManageEmployee(Session, $scope, EmployeeServices) {
        var vm = this;
        EmployeeServices.getEmployees().then(function (employees) {
            $scope.employeeData = employees;
        });

        $scope.editEmployee = function (empId) {
            console.log('Edit -- ', empId);
        }

        $scope.deleteEmployee = function (empId) {
            console.log('Delete -- ', empId);
        }

        $scope.reSetPassword = function (empId) {
            console.log('Reset -- ', empId);
        }
    }
})();