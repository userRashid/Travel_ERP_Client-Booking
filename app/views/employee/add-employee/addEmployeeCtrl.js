(function () {
    angular
        .module('erp_employee')
        .controller('AddEmployeeCtrl', AddEmployee);

    function AddEmployee($scope, ErpNodeServices, FormData, $stateParams, EmployeeServices) {
        $scope.Employee = ErpNodeServices.createForm(FormData.employee());
        var empId = $stateParams.empId || null;
        if (empId) {
            $scope.isUpdate = true;
            var model = EmployeeServices.getEmployeeDetail();
            $scope.Employee.promise.then(function (data) {
                if (model) {
                    data.setModel(model);
                } else {
                    var employee = EmployeeServices.getEmployeeFromSession(empId);
                    EmployeeServices.getEmployee(employee).then(function (response) {
                        data.setModel(response);
                    });
                }
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
                EmployeeServices.updateEmployee(data.getModel(), empId);
            });
        }
    }
})();