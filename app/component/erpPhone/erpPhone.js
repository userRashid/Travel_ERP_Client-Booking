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
         $scope.phoneNumberPattern = /^[7|8|9]\d*/;
  }

  function renderHTML(){
    var html = '';
        html +='<span style="color:red;" ng-show="myerpPhone.myInput.$error.pattern">Phone number must begin with either 7,8 or 9 </span>' +
               '<span style="color:red;" ng-show="myerpPhone.myInput.$error.maxlength">Phone number must of 10 digits</span>' +
                '<div class="input-group" ng-form name="myerpPhone">' +
                  '<span ng-if="data.code" class="input-group-addon">{{data.code}}</span>' +
                  '<input name="myInput" type="text" ng-model="data.model" class="form-control"  ng-pattern="phoneNumberPattern" ng-maxlength="10" >' +
                '</div>';
    return html;
  }
});
