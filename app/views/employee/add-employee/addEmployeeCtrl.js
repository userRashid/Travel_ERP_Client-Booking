(function () {
    angular
        .module('erp_employee')
        .controller('AddEmployeeCtrl', AddEmployee);

    function AddEmployee($scope, ErpNodeServices, FormData, API, Notify, $stateParams, EmployeeServices) {
        $scope.Employee = ErpNodeServices.createForm(FormData.employee());
        console.log($stateParams.empId);
        if ($stateParams.empId) {
            $scope.buttonText = 'Update';
            $scope.Employee.promise.then(function (data) {
                var model = EmployeeServices.getEmployeeDetail();
                data.setModel(model);
            });
        } else {
            $scope.buttonText = 'Create';
        }
        $scope.addEmployee = function () {
            $scope.Employee.promise.then(function (data) {
                var model = data.getModel();
                API.post('employee', model).then(function (response) {
                    Notify.add('success', 'Success', response.data.message);
                });
            });
        }
    }
})();