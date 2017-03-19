angular.module('erp_component').directive('sideMenu',[function(){
  return {
    link: function(scope, element, attrs){
      // $timeout(function(){
      setTimeout(function(){
        $(element).metisMenu();
      },10);

      scope.$watch(scope.menus, function(){
        setTimeout(function(){
          $(element).metisMenu();
        },10);
      });

      scope.$on('test', function(){
        setTimeout(function(){
          //scope.$apply(function(){
          //$(element).metisMenu();
          //});
          scope.$apply();
        },10);
      });
    }
  }
}])
