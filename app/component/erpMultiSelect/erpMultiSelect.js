angular.module('erp_component').directive('erpMultiSelect',function($compile,$q){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpMultiSelect'
    }
    ,link : link
    ,controller : controller
  }

  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }

  function controller($scope){
    $scope.getDropDown = function(query) {
      var _d = $q.defer();
      $scope.data.dropDown.then(function(allItems) {
        var filteredItems = _.chain(allItems)
          .filter(function(x) { return x.toLowerCase().indexOf(query.toLowerCase()) > -1; })
          .take(10)
          .value();
        _d.resolve(filteredItems);
      });
      return _d.promise;
    };
  }
  function renderHTML(){
    var html = '';
      html +='<tags-input class="tags-input-override-not" ng-model="data.model" allow-leftover-text="false" placeholder="{{data.label}}" add-on-blur="false" add-on-enter="true" replace-spaces-with-dashes="false">';
        html +='<auto-complete source="getDropDown($query)"min-length="0" debounce-delay="0" load-on-focus="true"></auto-complete>';
      html +='</tags-input>';
    return html;
  }
});
