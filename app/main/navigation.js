angular.module('sbAdminApp').factory('Navigation',function($location){
  return {
    go  : go
  }

  function go(path){
    $location.path(path);
  }
})
