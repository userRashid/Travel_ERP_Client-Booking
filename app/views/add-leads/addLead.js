'use strict';
angular.module('sbAdminApp').controller('addLead',function ($scope,ErpNodeServices,API,Authenticate,Notify,$state,FormData) {
    $scope.customerId = null;
    $scope.LeadDetail       = ErpNodeServices.createForm(FormData.addLeadData());
    $scope.CustomerDetail   = ErpNodeServices.createForm(FormData.customer());
    $scope.AdditionalDetail = ErpNodeServices.createForm(FormData.additionalInformation());
    $scope.addLead = function(){
      if($scope.customerId){

      } else {
        $scope.CustomerDetail.then(function(data){
          var model = data.getModel();
          $scope.AdditionalDetail.then(function(_data){
            model.erp_dateOfBirth = _data.getModel().erp_dob;
            model.erp_createdBy = Authenticate.user().id;
            API.post('customer',model).then(function(response){
              var customerId =  response.data.id;
              $scope.LeadDetail.promise.then(function(lead){
                var leadModel = lead.getModel();
                leadModel.erp_customerId = customerId;
                leadModel.erp_assignedTo  = Authenticate.user().id;
                leadModel.erp_createdBy   = Authenticate.user().id;
                leadModel.erp_leadStatus  = "New";
                API.post('lead',leadModel).then(function(_r){
                  Notify.add('success','Success',_r.data.message);
                  $state.go('leads.all');
                },function(_e){
                    Notify.add('error','Error','');
                    //console.log('Error ---- ',_e);
                });
              })
            },function(error){
              Notify.add('error',error.data.errorCode,error.data.errorMessgae);
            });
          },function(error){
             console.log('Error ',error);
           })
        });
      }
    };
  });
