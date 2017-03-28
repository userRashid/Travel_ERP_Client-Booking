(function () {

    'use strict';
    angular
        .module('erp_employee', [])
        .config(config);

    function config($stateProvider) {
        //
        $stateProvider.state('employee', {
            templateUrl: 'views/dashboard/main.html',
            url: '/employee'
        }).state('employee.add-employee', {
            templateUrl: 'views/employee/add-employee/add-employee.html',
            controller: 'AddEmployeeCtrl',
            url: '/add-employee'
        }).state('employee.manage-employee', {
            templateUrl: 'views/employee/manage-employee/manage-employee.html',
            controller: 'ManageEmployeeCtrl',
            url: '/manage-employee'
        }).state('employee.manage-detail', {
            templateUrl: 'views/employee/add-employee/add-employee.html',
            controller: 'AddEmployeeCtrl',
            url: '/manage-employee/:empId'
        }).state('employee.assign-leads', {
            templateUrl: 'views/employee/assign-leads/assign-leads.html',
            controller: 'AssignLeadsCtrl',
            url: '/assign-leads'
        });
    }
})();
(function () {
    'use strict';

    angular
        .module('erp_employee')
        .factory('EmployeeServices', EmployeeServices);

    function EmployeeServices(Session, API, $q, Notify, $state) {
        return {
            getEmployees: getEmployees
            , getEmployee: getEmployee
            , getEmployeeDetail: getEmployeeDetail
            , setEmployeeDetail: setEmployeeDetail
            , resetPassword: resetPassword
            , addEmployee: addEmployee
            , updateEmployee: updateEmployee
            , getEmployeeFromSession: getEmployeeFromSession
        }
        var _emp = null;

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

        function getEmployeeFromSession(id) {
            var employees = JSON.parse(Session.get('employee'));
            var _data = null;
            employees.forEach(function (item) {
                if (item.erp_emp_id == id) {
                    _data = item;
                }
            });
            return _data;
        }

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

        function resetPassword(empId) {
            API.put('employee/' + empId + '/password').then(function (response) {
                Notify.add('success', 'Success', response.data.message);
            });
        }

        function addEmployee(model) {
            API.post('employee', model).then(function (response) {
                Notify.add('success', 'Success', response.data.message);
                $state.go('employee.manage-employee');
            });
        }

        function updateEmployee(model, empId) {
            API.put('employee/' + empId, model).then(function (response) {
                Notify.add('success', 'Success', response.data.message);
                $state.go('employee.manage-employee');
            }, function (error) {
                Notify.add('error', 'Error', error.data.errorMessgae);
            });
        }
    }

})();
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