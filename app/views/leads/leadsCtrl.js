'use strict';
angular.module('sbAdminApp').controller('LeadsCtrl', function ($scope,API,$stateParams,Notify,Session,$state,Actions,$q,LeadsServices,$uibModal,Authenticate){
    $scope.Lead     = {};
    $scope.Customer = {};
    $scope.Note     = {};
    $scope.Timeline = {};
    $scope.Attach   = {};
    $scope.leadId = $stateParams.id;
    if(!$scope.leadId) $state.go('leads.all');
    $scope.promise = API.get('lead/'+$scope.leadId);
    $scope.Timeline.promise = $scope.promise;
    $scope.Lead.data = $scope.promise;
    $scope.Customer.data = $scope.promise;
    $scope.Lead.type        = 'lead';
    $scope.Lead.isShow      = true;
    $scope.Customer.type    = 'customer';
    $scope.Customer.isShow  = true;
    $scope.LeadStatus ={name : 'erp_leadStatus',values : LeadsServices.getLeadStatus()};
    $scope.promise.then(function(response){
        $scope.LeadStatus.model = response.data.erp_leadStatus;
    });

    $scope.open = function (size) {
          var leadId    =  $scope.leadId,
          modalInstance = $uibModal.open({
          animation  : $scope.animationsEnabled,
          templateUrl: 'myModalContent.html',
          controller : function($scope,ErpNodeServices,FormData,$uibModalInstance){
             $scope.BookingDetail = ErpNodeServices.createForm(FormData.addBookingData());
             $scope.addBooking = function(){
                $scope.BookingDetail.then(function(data){
                    $scope.Model = data.getModel();
                    $scope.Model.erp_createdById = Authenticate.user().id;
                    $scope.Model.erp_leadId = leadId;
                    if($scope.Model.erp_taxIncluded) $scope.Model.erp_taxIncluded = true;
                    if($scope.Model.erp_salesPersonId) $scope.Model.erp_salesPersonId = 10;
                    API.post('booking',$scope.Model).then(function(response){
                       Notify.add('success','Success',response.data.message);
                       $uibModalInstance.dismiss('cancel');
                       $state.go('booking.list');
                    },function(error){
                        Notify.add('error','Error',error.data.errorMessgae);
                    });
                });
             }
          },
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          //$scope.selected = selectedItem;
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
      };

    $scope.changeStatus = function(){
        if($scope.LeadStatus.model == 'New'){
            $scope.open('lg');
        } else {
            LeadsServices.saveLead($scope.leadId,$scope.LeadStatus)
        }
    }
    function addNew(id,leadId,noteType,message){
        var temp = {};
            temp.erp_noteId     = id;
            temp.erp_leadId     = leadId;
            temp.erp_notes      = message;
            temp.erp_source     = noteType;
            temp.erp_createdBy  = Session.get('id');
            temp.erp_updateTimestamp = Math.floor(Date.now());
        return temp;
    }

    //Timeline
    $scope.item = {
                    meeting : false,
                    email   : false,
                    phone   : false,
                    attach  : false,
                    alert   : false
                   };
    $scope.openPanel = function(name){
        for(var key in $scope.item){
            if(key == name){
                if($scope.item[key]){
                    $scope.item[key] = false;
                } else {
                    $scope.item[key] = true;
                    $scope.noteType = key;
                }
            } else {
                $scope.item[key] = false;
            }
        }
    };
    $scope.closeAllPanel = function(){
        for(var key in $scope.item){
            $scope.item[key] = false;
        }
    };
    $scope.addNote = function(){
      $scope.Note.promise.then(function(data){
        var model = data.getModel()
          ,leadId = $scope.leadId;
          model.erp_source = $scope.noteType;
          model.erp_createdBy = Session.get('id');
        API.post('lead/'+leadId+'/note',model).then(function(response){
          $scope.closeAllPanel();
          $scope.Timeline.addNew(addNew(response.data.id,leadId,$scope.noteType,model.erp_notes));
          Notify.add('success','Success',response.data.message);
        },function(error){
          console.log('Error  ',error)
        });
      });
    };
});
