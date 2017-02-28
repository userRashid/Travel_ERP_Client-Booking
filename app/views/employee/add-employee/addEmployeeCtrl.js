(function () {
    angular
        .module('erp_employee')
        .controller('AddEmployeeCtrl', AddEmployee);

    function AddEmployee($scope, ErpNodeServices, FormData, $stateParams, EmployeeServices) {
        $scope.Employee = ErpNodeServices.createForm(FormData.employee());

        if ($stateParams.empId) {
            $scope.isUpdate = true;
            $scope.Employee.promise.then(function (data) {
                data.setModel(EmployeeServices.getEmployeeDetail());
            });
        } else {
            $scope.isUpdate = false;
        }

        $scope.addEmployee = function () {
            $scope.Employee.promise.then(function (data) {
                EmployeeServices.addEmployee(data.getModel());
            });
        }

        $scope.updateEmployee = function () {
            $scope.Employee.promise.then(function (data) {
                EmployeeServices.updateEmployee(data.getModel(), $stateParams.empId);
            });
        }
    }
})();