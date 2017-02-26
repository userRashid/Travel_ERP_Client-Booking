(function () {

    'use strict';
    angular
        .module('erp_login', [])
        .config(config);

    function config() {
        //
    }
})();
(function () {

    'use strict';
    angular
        .module('erp_login')
        .controller('Login', Login);
    function Login($scope, Navigation, Authenticate, API, $state, $q, Session) {
        // Locals
        function _makeTeamData(_data) {
            var temp = new Array();
            _data.forEach(function (item) {
                temp.push({ id: item.erp_team_id, label: item.erp_team_name });
            });
            return temp;
        }

        function _makeRoleData(_data) {
            var temp = new Array();
            _data.forEach(function (item) {
                temp.push({ id: item.erp_role_id, label: item.erp_role_name });
            });
            return temp;
        }

        ////////////////////////
        $scope.Login = function (data) {
            var promise = [API.post('employee/login', data), API.get('employee')];
            $q.all(promise).then(function (response) {
                var loginData = response[0].data;
                Session.set('employee', JSON.stringify(response[1].data));
                Session.set('bookingCount', loginData.erp_bookingCount);
                Session.set('customerCount', loginData.erp_customerCount);
                Session.set('leadCount', loginData.erp_leadCount);
                Session.set('authToken', loginData.authToken);
                Authenticate.doLogin('', loginData.erp_employee.erp_emp_id, loginData.erp_employee.erp_emp_name);
                $state.go('leads.all', { objId: 479 });
                var authPromise = [API.get('roles'), API.get('teams')];
                $q.all(authPromise).then(function (authResponse) {
                    Session.set('roles', JSON.stringify(_makeRoleData(authResponse[0].data)));
                    Session.set('teams', JSON.stringify(_makeTeamData(authResponse[1].data)));
                })
            });
            //Authenticate.doLogin('',9,'Rashid');
        };
        $scope.Navigation = Navigation;
        $scope.Authenticate = Authenticate;
    }
})();