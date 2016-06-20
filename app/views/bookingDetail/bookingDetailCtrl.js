//'use strict';
angular.module('sbAdminApp').controller('bookingDetailCtrl', function($scope,$stateParams,BookingDetailService,$uibModal,Watch,API,Notify,Authenticate){
    $scope.bookingId = $stateParams.id;
    BookingDetailService.getBooking($stateParams.id).then(function(data){
       // console.log(data);
        $scope.conversionData = data;
    });
    $scope.editBooking = function(data){console.log("data",data);
        $scope.modelData = data;
        $scope.open('lg');
    }

    $scope.open = function (size) {
          var modelData = $scope.modelData,
          modalInstance = $uibModal.open({
          templateUrl   : 'myModalContent.html',
          controller    : function($scope,ErpNodeServices,FormData,$uibModalInstance,LeadsServices,Watch){
            $scope.BookingDetail = ErpNodeServices.createForm(FormData.editBookingData());
            $scope.BookingDetail.promise.then(function(data){
                $scope.bookingButton = Watch.validation(data);
                modelData.erp_createdById = ErpNodeServices.getName(modelData.erp_createdById);
                if(modelData.hasOwnProperty('erp_salesPersonId')) modelData.erp_salesPersonId = modelData.erp_salesPerson.erp_emp_name//GlobalData.getEmployee(modelData.erp_salesPersonId);
                data.setModel(modelData);
                $scope._data = data.data;
                //Watch.makeActualCost(data.data);
            });
          $scope.$watch('_data',function(data){
            Watch.makeActualCost(data);
            $scope.bookingButton = Watch.validation(data);
          },true);

          $scope.updateBooking = function(){
               $scope.BookingDetail.promise.then(function(data){
                   var updateModelData = data.getModel();
                   console.log(updateModelData);
                   //,updateModelData.erp_createdById = Authenticate.user().id;
                   API.put('booking/'+modelData.erp_bookingId,updateModelData).then(function(response){
                       Notify.add('success','Success',response.data.message);
                       //LeadsServices.saveLead(leadId,LeadStatus);
                       $uibModalInstance.dismiss('cancel');
                   },function(error){
                        Notify.add('error','Error',error);
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
});
