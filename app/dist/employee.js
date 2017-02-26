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
            , getEmployeeDetail: getEmployeeDetail
            , setEmployeeDetail: setEmployeeDetail
        }
        var _emp;

        //////////////////////////////////
        //Locals
        //////////////////////////////////

        function extend(obj, src) {
            for (var key in src) {
                if (src.hasOwnProperty(key) && src[key]) {
                    obj[key] = src[key];
                }
            }
            return obj;
        }

        /////////////////////////////////


        function getEmployee(employee) {
            var empId = employee.erp_emp_id;
            var _q = $q.defer();
            API.get('employee/' + empId).then(function (response) {
                _q.resolve(extend(response.data, employee));
            });
            //            _q.resolve({
            //                erp_emp_userName: "Hello"
            //                , erp_emp_roles: '8'
            //                , erp_emp_teams: 15
            //                , erp_emp_leads: Math.floor((Math.random() * 10) + 1)
            //                , erp_emp_bookings: Math.floor((Math.random() * 100) + 1)
            //            });
            return _q.promise;
        }

        function getEmployees() {
            var employees = JSON.parse(Session.get('employee'));
            var promises = new Array();
            employees.forEach(function (employee) {
                promises.push(getEmployee(employee));
            });
            return $q.all(promises);
        }

        function setEmployeeDetail(data) {
            _emp = data;
        }

        function getEmployeeDetail() {
            return _emp;
        }
    }

})();
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