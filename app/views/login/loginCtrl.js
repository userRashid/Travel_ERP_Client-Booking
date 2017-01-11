(function () {
    angular
        .module('erp_login')
        .controller('Login', Login);
    function Login($scope, Navigation, Authenticate, API, $state, $q, Session) {
        $scope.Login = function (data) {
            var promise = [API.post('employee/login', data), API.get('employee')];
            $q.all(promise).then(function (response) {
                var loginData = response[0].data;
                Session.set('employee', JSON.stringify(response[1].data))
                Session.set('bookingCount', loginData.erp_bookingCount);
                Session.set('customerCount', loginData.erp_customerCount);
                Session.set('leadCount', loginData.erp_leadCount);
                Session.set('authToken', loginData.authToken);
                Authenticate.doLogin('', loginData.erp_employee.erp_emp_id, loginData.erp_employee.erp_emp_name);
                $state.go('leads.all', { objId: 479 });
            });
            //Authenticate.doLogin('',9,'Rashid');
        };
        $scope.Navigation = Navigation;
        $scope.Authenticate = Authenticate;
    };
})();