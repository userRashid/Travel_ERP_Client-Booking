(function () {

    'use strict';
    angular
        .module('erp_leads')
        .controller('LeadsCtrl', LeadsCtrl);
    function LeadsCtrl($scope, API, $stateParams, Notify, Session, $state, Actions, $q, LeadsServices, $uibModal, Authenticate, $http,ErpNodeServices,FormData) {
        $scope.Lead = {};
        $scope.Customer = {};
        $scope.Note = {};
        $scope.Timeline = {};
        $scope.Attach = {};
        $scope.Alert = {};
        $scope.Email = {};
        $scope.Activity = {};
        $scope.leadId = $stateParams.id;
        if (!$scope.leadId) $state.go('leads.all');
        $scope.promise = API.get('lead/' + $scope.leadId);
        $scope.Timeline.promise = $scope.promise;
        $scope.Lead.data = $scope.promise;
        $scope.Customer.data = $scope.promise;
        $scope.Lead.type = 'lead';
        $scope.Lead.isShow = true;
        $scope.Customer.type = 'customer';
        $scope.Customer.isShow = true;
        $scope.isActivityType = false;
        $scope.LeadStatus = { name: 'erp_leadStatus', values: LeadsServices.getLeadStatus() };
        $scope.promise.then(function (response) {
            $scope.LeadStatus.model = response.data.erp_leadStatus;
            if (response.data.erp_leadStatus == 'Matured') $scope.LeadStatus.isDisable = true;
        });

        $scope.$watch('Activity',function(data){
         if(!data.data)return;
            $scope.isActivityType = false;
            if(data.data[0].model){
                $scope.isActivityType = true;
                $scope.Note = ErpNodeServices.createForm(FormData.addNote());
                $scope.activityType = data.data[0].model;
            }
        },true)
        $scope.open = function (size) {
            var leadId = $scope.leadId,
                LeadStatus = $scope.LeadStatus,
                modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: function ($scope, ErpNodeServices, FormData, $uibModalInstance, LeadsServices, Watch) {
                        $scope.BookingDetail = ErpNodeServices.createForm(FormData.addBookingData());
                        $scope.$watch('BookingDetail.data', function (data) {
                            $scope.bookingButton = Watch.validation(data);
                            //Watch.makeActualCost(data);
                            Watch.showAmountReceived(data);
                            //  Watch.setRooms(data);
                        }, true);
                        // set zero value
                        function setZero(data) {
                            data.erp_vehicleCost = 0;
                            var _data = data.erp_hotelBookings,
                                len = _data.length;
                            for (var i = 0; i < len; i++) {
                                data.erp_hotelBookings[i].erp_roomCost = 0;
                            }
                            return data;
                        }
                        $scope.addBooking = function () {
                            $scope.BookingDetail.promise.then(function (data) {
                                $scope.Model = data.getModel();
                                $scope.Model.erp_createdById = Authenticate.user().id;
                                $scope.Model.erp_leadId = leadId;
                                $scope.Model.erp_roomCount = $scope.Model.erp_hotelBookings[0].erp_roomCount;
                                if ($scope.Model.erp_taxIncluded) $scope.Model.erp_taxIncluded = true;
                                if ($scope.Model.erp_salesPersonId) $scope.Model.erp_salesPersonId = Authenticate.user().id;
                                API.post('booking', setZero($scope.Model)).then(function (response) {
                                    Notify.add('success', 'Success', response.data.message);
                                    LeadsServices.saveLead(leadId, LeadStatus);
                                    $uibModalInstance.dismiss('cancel');
                                    $state.go('booking.list');
                                }, function (error) {
                                    Notify.add('error', 'Error', error.data.errorMessgae);
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

        $scope.changeStatus = function () {
            if ($scope.LeadStatus.model == 'Matured') {
                $scope.open('lg');
            } else {
                LeadsServices.saveLead($scope.leadId, $scope.LeadStatus);
            }
        }
        function addNew(id, leadId, noteType, message, response) {
            response.erp_leadId = leadId;
            response.erp_createdBy = Session.get('id');
            response.erp_updateTimestamp = Math.floor(Date.now());
            response.erp_source = response.erp_source.toLowerCase();
            return response;
        }
        //Timeline
        $scope.item = {
            note: false,
            email: false,
            phone: false,
            attach: false,
            alert: false,
            activity:false
        };



        $scope.openPanel = function (name) {
          // console.log(name, $scope.item);
            for (var key in $scope.item) {
                if (key == name) {
                    if ($scope.item[key]) {
                        $scope.item[key] = false;
                    } else {
                        $scope.item[key] = true;
                        $scope.noteType = key;
                    }
                } else {
                    $scope.item[key] = false;
                }

            }
            if($scope.item['activity']) $scope.Activity = ErpNodeServices.createForm(FormData.erpActivity());
        };
        $scope.closeAllPanel = function () {
            for (var key in $scope.item) {
                $scope.item[key] = false;
            }
        };

        $scope.addAttach = function () {
            LeadsServices.addAttachment($scope.leadId, $scope.Attach.promise, $scope.noteType, Session.get('id')).then(function (response) {
                $scope.closeAllPanel();
                $scope.Timeline.addNew(addNew(response[0].erp_attId, $scope.leadId, "attachment", response[0].erp_attachmentName, response[0]));
                Notify.add('success', 'Success', '');
            }, function (error) {
                console.log('Error  ', error)
            });
        };

        $scope.addAlert = function () {
            LeadsServices.addAlert($scope.Alert.promise, Session.get('id'), $scope.leadId).then(function (response) {
                $scope.closeAllPanel();
                Notify.add('success', 'Success', response.data.message);
                $scope.Timeline.addNew(addNew(response.data.id, $scope.leadId, $scope.noteType, "Alert", response));
            }, function (error) {
                console.log("error", error)
            })
        }

        $scope.cancel = function () {
            for (var key in $scope.item) {
                $scope.item[key] = false;
            }
        }

        $scope.addNote = function () {
            $scope.Note.promise.then(function (data) {
                var model = data.getModel()
                    , leadId = $scope.leadId;
                model.erp_source = $scope.activityType;
                model.erp_createdBy = Session.get('id');
                API.post('lead/' + leadId + '/note', model).then(function (response) {
                    $scope.closeAllPanel();
                    $scope.Timeline.addNew(addNew(response.data.id, leadId, $scope.activityType, model.erp_notes, model));
                    Notify.add('success', 'Success', response.data.message);
                }, function (error) {
                    console.log('Error  ', error)
                });
            });
        };
    };


})();