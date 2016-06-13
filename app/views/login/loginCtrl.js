angular.module('sbAdminApp').controller('Login', function ($scope,Navigation,Authenticate,API,$state,$q,Session) {
    $scope.Login = function(data){
        var promise = [API.post('employee/login',data),API.get('employee')];
        $q.all(promise).then(function(response){
            Session.set('employee',JSON.stringify(response[1].data))
            Authenticate.doLogin('',response[0].data.erp_emp_id,response[0].data.erp_emp_name);
            $state.go('leads.all', { objId: 479 });
        });
        //Authenticate.doLogin('',9,'Rashid');
    };
    $scope.Navigation = Navigation;
    $scope.Authenticate = Authenticate;
});
