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
            $state.go('employee.manage-detail', { empId: employee.erp_emp_id });
        }

        $scope.deleteEmployee = function (empId) {

            console.log('Delete -- ', empId);
        }

        $scope.resetPassword = function (empId) {
            EmployeeServices.resetPassword(empId.erp_emp_id);
        }
    }
})();