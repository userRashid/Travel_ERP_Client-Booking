angular.module('sbAdminApp').controller('RootCtrl', function ($scope,Navigation,Authenticate) {
    $scope.Navigation = Navigation;
    $scope.Authenticate = Authenticate;
    $scope.isAdmin = function(){
        return superAdminIds.indexOf(Authenticate.user().id) !== -1;
    }
  });
