(function () {

    'use strict';
    angular
        .module('erp_employee', [])
        .config(config);

    function config() {
        //
    }
})();
(function () {
    'use strict';

    angular
        .module('erp_employee')
        .factory('EmployeeServices', EmployeeServices);

    function EmployeeServices(Session, API, $q) {
        return {
            getEmployees: getEmployees
            , getEmployee: getEmployee
        }

        //////////////////////////////////
        //Locals
        //////////////////////////////////

        function extend(obj, src) {
            for (var key in src) {
                if (src.hasOwnProperty(key)) obj[key] = src[key];
            }
            return obj;
        }

        /////////////////////////////////


        function getEmployee(empId) {
            //API.get('')
            var _q = $q.defer();
            _q.resolve({
                erp_emp_userName: "&^%&%%^%&"
                , erp_emp_roles: '8'
                , erp_emp_teams: 15
                , erp_emp_leads: Math.floor((Math.random() * 10) + 1)
                , erp_emp_bookings: Math.floor((Math.random() * 100) + 1)
            });
            return _q.promise;
        }

        function getEmployees() {
            var employees = JSON.parse(Session.get('employee'));
            var promises = new Array();
            var updatedEmployees = new Array();
            var _q = $q.defer();
            employees.forEach(function (employee) {
                getEmployee(employee.erp_emp_id).then(function (data) {
                    updatedEmployees.push(extend(data, employee));
                });
            });
            _q.resolve(updatedEmployees);
            return _q.promise;
        }
    }

})();
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
(function () {
    angular
        .module('erp_employee')
        .controller('AssignLeadsCtrl', AssignLeads);

    function AssignLeads() {
        var vm = this;

    }
})();
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