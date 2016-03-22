'use strict';
angular.module('sbAdminApp').directive('erpUpload',function($compile,ErpNodeServices,API,Notify,Session,FormData){
  return {
    restrict : 'A'
    ,scope : {
      options : '=erpUpload'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  };

  function controller($scope){
    $scope.options.promise = ErpNodeServices.createForm(FormData.addAttach());
  }
  function renderHTML(){
    var html = '';
    html = '<input type="file" file-model="options.model"/>';
    return html;
  }
});

angular.module('sbAdminApp').directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;

                  element.bind('change', function(){
                    console.log('element[0] -- ',element[0].files);
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);