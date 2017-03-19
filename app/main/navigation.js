angular.module('erp_core').factory('Navigation',function($location){
  return {
    go  : go
  }

  function go(path){
    $location.path(path);
  }
})
