angular.module('sbAdminApp').controller('RootCtrl', function ($scope,Navigation,Authenticate) {
    $scope.Navigation = Navigation;
    $scope.Authenticate = Authenticate;
  });
