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