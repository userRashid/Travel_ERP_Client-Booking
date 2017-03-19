angular.module('erp_component').directive('erpTextarea',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpTextarea'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function controller($scope){
        var _modelData ="";
        $scope.$watch('data.checkboxModel',function(data){
            if(!data) return;
            if(data == true){
                _modelData =  $scope.data.model;
                $scope.data.model= $scope.data.checkboxData.concat(_modelData);
            }else if(data == false){
                _modelData =  $scope.data.model;
                $scope.data.model= _modelData.replace($scope.data.checkboxData,"");
            }
        });
  }
  function renderHTML(){
    var html = '';
    html
    html +='<span ng-if="data.isCheckbox"><input type="checkbox"  ng-model="data.checkboxModel">&nbsp;{{data.checkboxLabel}}</span>{{}}'+
           '<textarea rows="4"  ng-model="data.model" class="form-control" placeholder="{{data.placeholder}}" value ="data.checkboxData"></textarea>'
    return html;
  }
});