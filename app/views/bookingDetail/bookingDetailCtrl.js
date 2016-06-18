//'use strict';
angular.module('sbAdminApp').controller('bookingDetailCtrl', function($scope,$stateParams,BookingDetailService,$uibModal,Watch){
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
            $scope.BookingDetail = ErpNodeServices.createForm(FormData.addBookingData());
            $scope.BookingDetail.promise.then(function(data){
                console.log(' ----- one ',data);
            //    Watch.makeActualCost(data.data);
                modelData.erp_createdById = ErpNodeServices.getName(modelData.erp_createdById);
                if(modelData.hasOwnProperty('erp_salesPersonId')) modelData.erp_salesPersonId = modelData.erp_salesPerson.erp_emp_name//GlobalData.getEmployee(modelData.erp_salesPersonId);
                data.setModel(modelData);
            });
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
