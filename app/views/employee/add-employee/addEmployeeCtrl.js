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