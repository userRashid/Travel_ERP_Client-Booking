angular.module('sbAdminApp').directive('erpPhone',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpPhone'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function controller($scope){
        var phoneNumbr = /^[7|8|9]\d*/;
        $scope.$watch('data',function(_data){
            $scope.erorr = '';
            if(!phoneNumbr.test(_data.model)&&_data.model) $scope.erorr="Phone Number must begin with either 7 or 8";
        },true);
  }
  function renderHTML(){
    var html = '';
        html +='<div class="input-group">' +
                '<span ng-if="data.code" class="input-group-addon">{{data.code}}</span>' +
                '<span style="color:red;">{{erorr}}</span>' +
                '<input type="text" ng-model="data.model" class="form-control" >' +
            '</div>';
    return html;
  }
});
