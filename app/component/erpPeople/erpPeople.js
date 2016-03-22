angular.module('sbAdminApp').directive('erpPeople',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpPeople'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));

  }
  function controller($scope){
    $scope.model = {};
    var f = true;
    $scope.$watch('model',function(_data){
        if(_data == undefined) return;
        $scope.data.model = {adults:_data.adults,kids:_data.kids};
    },true);
    $scope.$watch('data',function(data){
        if(data == undefined) return;
        if(!f) return;
        $scope.model.adults = data.adults;
        $scope.model.kids   = data.kids ;
        f = false;
    },true);
  }
  function renderHTML(){
    var html = '';
    html +='<div class="clearfix row">';
      html +='<div class="col-lg-6" data-erp-add-more="model.adults"></div>'+
            '<div class="col-lg-6" data-erp-add-more="model.kids"></div>';
    html +='</div>';
    return html;
  }
});
