angular.module('sbAdminApp').controller('Login', function ($scope,Navigation,Authenticate,API) {
    $scope.Login = function(data){
        API.post('employee/login',data).then(function(response){
            Authenticate.doLogin('',response.data.erp_emp_id,response.data.erp_emp_name);
        });
        //Authenticate.doLogin('',9,'Rashid');
    };
    $scope.Navigation = Navigation;
    $scope.Authenticate = Authenticate;
});
