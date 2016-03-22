'use strict';
angular.module('sbAdminApp').directive('lead',function($compile,ErpNodeServices,API,Notify,FormData,Authenticate){
  return {
    restrict : 'A'
    ,scope : {
      options : '=lead'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  };

  function controller($scope){
    $scope.info = $scope.options.isShow;
    $scope.isEdit = false;
    var model = '';
    if($scope.options.type === 'lead'){
        $scope.Form = ErpNodeServices.createForm(FormData.addLeadData());
    } else {
        $scope.Form = ErpNodeServices.createForm(FormData.customer());
    }
    $scope.options.data.then(function(response){
        if($scope.options.type === 'lead'){
            model = response.data;
        } else {
            model = response.data.erp_customer;
        }
        $scope.data = response.data;
    });

    $scope.editLead = function(){
        $scope.isEdit = true;
        $scope.Form.then(function(data){
            data.setModel(model);
        });
    }
    $scope.cancelLead = function(){
        $scope.isEdit = false;
    }
    $scope.showInfo = function(){
        $scope.info = !$scope.info;
    }
    $scope.leadEmail = function(){
        _a();
    }
    $scope.update = function(){
        $scope.Form.then(function(data){
            var _model = data.getModel()
                ,header = {'Content-Type' : 'application/json'};
            if($scope.options.type === 'lead'){
                _model.erp_customerId = $scope.data.erp_customerId;
                API.put('lead/'+model.erp_id,_model,header).then(function(response){
                    //console.log('SSS -- ',response);
                    $scope.isEdit = false;
                    Notify.add('success','Success','Lead update successfully');
                },function(error){
                    Notify.add('error','Error','Error on updating lead');
                });
            } else {
                _model.erp_dateOfBirth = $scope.data.erp_customer.erp_dateOfBirth;
                _model.erp_createdBy = Authenticate.user().id;
                API.put('customer/'+model.erp_id,_model,header).then(function(response){
                    //console.log('Response ***** ',response);
                    Notify.add('success','Success','Customer information updated successfully');
                },function(error){
                    Notify.add('error','Error','Error on updating customer');
                });
            }
        });
    }
    function _a(){
        alert('I am working on that');
    }
  }
  function renderHTML(){
    var html = '';
    html = '<div>' +
                '<div ng-if="!isEdit" class="panel panel-default" ng-switch on="options.type">' +
                    '<div class="panel-heading leads">' +
                        '<div class="row">' +
                            '<div class="col-lg-10 cursor-p" ng-click="showInfo()" >' +
                                '<div ng-switch-when="customer">' +
                                    '<h3 class="m0">{{data.erp_customer.erp_name}}</h3>' +
                                    '<p class="m0">{{data.erp_customer.erp_emailId}}</p>' +
                                '</div>' +
                                '<div ng-switch-when="lead">' +
                                    '<h3 class="m0">{{data.erp_destinations}}</h3>' +
                                    '<p class="m0">{{data.erp_departureDate}}</p>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-lg-1 cursor-p edit-lead" ng-click="editLead()"><i class="fa fa-pencil"></i></div>' +
                            //'<div ng-switch-when="customer" ng-click="leadEmail()"tooltip="{{data.erp_customer.erp_emailId}}" tooltip-placement="top" class="col-lg-1 cursor-p" title="{{data.erp_customer.erp_emailId}}"><i class="fa fa-envelope"></i></div>' +
                        '</div>' +
                    '</div>' +
                    '<div ng-show="info" class="panel-body">' +
                        '<div ng-switch-when="customer">' +
                            '<b>Phone : </b> {{data.erp_customer.erp_phoneNo}}<br />' +
                            '<b>City : </b> {{data.erp_customer.erp_city}}<br />' +
                            '<b>Country : </b> {{data.erp_customer.erp_country}}' +
                        '</div>' +
                        '<div ng-switch-when="lead">' +
                            '<b>Nights : </b> {{data.erp_nights}}<br />' +
                            '<b>People : </b> {{data.erp_adultCount}} - Adult&nbsp;,&nbsp;{{data.erp_kidsCount}} - Kids<br />' +
                            '<b>Leaving From : </b> {{data.erp_leavingFrom}}<br />' +
                            '<b>Lead Source : </b> {{data.erp_leadSource}}<br />' +
                            '<b>Additional Info : </b> {{data.erp_additionalInfo}}<br />' +
                            '<b>Lead added on : </b> {{data.erp_creationDate}}<br />' +
                        '</div>' +
                    '</div>' +
                '</div>'+
                '<div ng-if="isEdit" class="panel panel-default panel-body">' +
                    '<div data-form-builder="Form"></div>' +
                    '<div class="text-right col-sm-12">' +
                        '<button class="btn btn-sm btn-success" ng-click="update()">Update</button>&nbsp;&nbsp;' +
                        '<button class="btn btn-sm" ng-click="cancelLead()">Cancel</button>' +
                    '</div>' +
                '</div>'
            '</div>';
    return html;
  }
});












