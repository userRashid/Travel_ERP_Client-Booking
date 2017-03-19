angular.module('erp_component').directive('erpCheckbox',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpCheckbox'
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope){
    $scope.data.values.then(function(_d){
      $scope.Data = _d;
    });
    $scope.$watch('Data',function(_d){
      if(_d == undefined) return;
      var len = _d.length
        ,temp = new Array();
        $scope.data.model = "";
      for(var i=0;i<len;i++){
        if(_d[i].model){
          temp.push(_d[i].value);
        }
      }
      if(temp.length >0) $scope.data.model = temp;
    },true);
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
    html +='<div class="clearfix">';
      html +='<div class="col-lg-4" ng-repeat="item in Data">';
        html +='<label class="checkbox"><div class="checker">';
        html +='<span><input type="checkbox" ng-model="item.model" ng-checked ="data.model"  class="checkbox" value="{{item.value}}"></span></div>';
        html += '{{item.label}}';
        html +='</label>';
      html +='</div>';
    html +='</div>';
    return html;
  }
});
