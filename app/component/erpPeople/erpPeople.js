angular.module('erp_component').directive('erpPeople',function($compile){
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
        $scope.model.adults = {};
        $scope.model.kids = {};
        if($scope.data.adults != undefined) $scope.model.adults.model = $scope.data.adults;
        if($scope.data.kids != undefined) $scope.model.kids.model = $scope.data.kids;
        $scope.$watch('model',function(_data){
            if(_data == undefined) return;
            if(_data.kids.model>0) $scope.data.model = {adults:_data.adults.model,kids:_data.kids.model};
            else $scope.data.model = {adults:_data.adults.model};
        },true);
    /*var f = true;

    $scope.$watch('data',function(data){
        if(data == undefined) return;
        if(!f) return;
        var am = 0; if(data.adults != undefined) am = data.adults;
        var cm = 0; if(data.adults != undefined) cm = data.adults;
        console.log(am,cm)
        $scope.model.adults.model = am;
        $scope.model.kids.model   = cm;
        console.log('********************* ',$scope.model,data);
        f = false;
    },true);*/
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
