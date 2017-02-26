(function () {
    angular
        .module('erp_employee')
        .controller('ManageEmployeeCtrl', ManageEmployee);

    function ManageEmployee(Session, $scope, EmployeeServices, $state) {

        var vm = this;
        EmployeeServices.getEmployees().then(function (employees) {
            $scope.employeeData = employees;
        });

        $scope.editEmployee = function (employee) {
            EmployeeServices.setEmployeeDetail(employee);
            $state.go('employee.manage-detail', { empId: 8 });
        }

        $scope.deleteEmployee = function (empId) {
            console.log('Delete -- ', empId);
        }

        $scope.reSetPassword = function (empId) {
            console.log('Reset -- ', empId);
        }
    }
})();