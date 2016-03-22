angular.module('sbAdminApp').directive('erpHotel',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpHotel'
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope){
    $scope.addMore = function(){

    }
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
        html += '<div class="add-hotel">' +
                    '<div class="row">' +
                        '<div class="form-group col-sm-6"><label>Name</label><input class="form-control" type="text" /></div>' +
                        '<div class="form-group col-sm-6"><label>Room Type</label>' +
                            '<select class="form-control"><option>1</option></select>' +
                        '</div><div class="form-group col-sm-4"><label>Room Cost</label><input class="form-control" type="text" /></div>' +
                        '<div class="form-group col-sm-4"><label>Room Count</label>' +
                            '<select class="form-control"><option>1</option></select>' +
                        '</div><div class="form-group col-sm-4"><label>Nights Of Stay</label>' +
                            '<select class="form-control"><option>1</option></select>' +
                        '</div>' +
                    '</div>' +
                    '<div><button class="btn btn-success" ng-click="addMore()">Add More</button></div>' +
                '</div>';
    return html;
  }
});
