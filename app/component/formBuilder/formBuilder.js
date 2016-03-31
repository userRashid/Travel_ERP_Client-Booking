'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp').directive('formBuilder',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=formBuilder'
      ,mode : '@'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  };

  function controller($scope){
    $scope.$watch('data',function(promise){
      promise.then(function(obj){
        $scope.options = obj.data;
      })
    });
    if($scope.mode == undefined){
      $scope.mode = 'full';
    }
    $scope.getClass = function(){
      var c = '';
      if($scope.mode == 'full')     c = 'col-lg-12';
      if($scope.mode == 'inline')   c = 'col-lg-4';
      if($scope.mode == 'half')     c = 'col-lg-6';
      return c;
    }
  }
  function renderHTML(){
    var html = '';
      html +='<form name="cardForm" class="clearfix">';
        html +='<div ng-class="getClass()" ng-repeat="item in options" ng-class="{\'selected\':$odd}" class="form-group" ng-switch on="item.type">';
            html +='<label ng-if="item.label">{{item.label}}</label>';
            html +='<input    ng-switch-when="erpText"      ng-model="item.model" class="form-control">';
            html +='<input    ng-switch-when="erpNumber"    ng-model="item.model" class="form-control">';
            html +='<div      ng-switch-when="erpEmail"     data-erp-email="item"></div>';
            html +='<div      ng-switch-when="erpPhone"     data-erp-phone="item"></div>';
            html +='<input    ng-switch-when="erpPassword"  ng-model="item.model" class="form-control" type="password">';
            html +='<textarea ng-switch-when="erpTextarea"  ng-model="item.model" class="form-control" rows="5"></textarea>';
            html +='<div      ng-switch-when="erpSelect"    data-erp-select="item"></div>';
            html +='<div      ng-switch-when="erpUpload"    data-erp-upload="item"></div>';
            html +='<div      ng-switch-when="erpPeople"    data-erp-people="item"></div>';
            html +='<div      ng-switch-when="erpCheckbox"  data-erp-checkbox="item"></div>';
            html +='<div      ng-switch-when="erpAddMore"   data-erp-add-more="item.model"></div>';
            html +='<div      ng-switch-when="erpCalender"  data-erp-calender="item"></div>';
            html +='<div      ng-switch-when="erpMultiSelect" data-erp-multi-select="item"></div>';
            html +='<div      ng-switch-when="erpHotel"     data-erp-hotel="item"></div>';
            html +='<div      ng-switch-when="erpTravelBookings"     data-erp-travel-bookings="item"></div>';
            html +='<div      ng-switch-when="erpTextEditor" text-angular="text-angular" ng-model="item.model" ta-disabled="false"></div>';
            html +='<div      ng-switch-default style="border: 1px solid #c9302c;">{{item.type}}</div>';
            html +='<div class="separator"></div>';
        html +='</div>';
      html +='</form>';
    return html;
  }

});
