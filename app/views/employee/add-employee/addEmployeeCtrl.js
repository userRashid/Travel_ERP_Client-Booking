(function () {
    angular
        .module('erp_employee')
        .controller('AddEmployeeCtrl', AddEmployee);

    function AddEmployee($scope, ErpNodeServices, FormData) {

        $scope.AddEmployee = ErpNodeServices.createForm(FormData.employee());

    }
})();