(function () {
    angular
        .module('erp_employee')
        .controller('AddEmployeeCtrl', AddEmployee);

    function AddEmployee($scope, ErpNodeServices, FormData) {

        $scope.AddEmployee = ErpNodeServices.createForm(FormData.employee());
        $scope.addEmployee = function () {
            $scope.AddEmployee.promise.then(function (data) {
                var model = data.getModel();
                console.log(' ***** ',model);
            })
        }

    }
})();