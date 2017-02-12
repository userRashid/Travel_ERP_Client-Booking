(function () {

    'use strict';
    angular
        .module('erp_booking', [])
        .config(config);

    function config() {
        //
    }
})();
(function () {
  'use strict';

  angular
    .module('erp_booking')
    .controller('bookingDetailCtrl', BookingDetailCtrl);

  function BookingDetailCtrl($scope, $stateParams, BookingDetailService, $uibModal, Watch, API, Notify, Authenticate, GlobalData) {
    $scope.bookingId = $stateParams.id;
    BookingDetailService.getBooking($stateParams.id).then(function (data) {
      $scope.conversionData = data;
    });
    $scope.editBooking = function (data) {
      $scope.modelData = data;
      $scope.open('lg');
    }

    $scope.open = function (size) {
      var modelData = $scope.modelData,
        modalInstance = $uibModal.open({
          templateUrl: 'myModalContent.html',
          controller: function ($scope, ErpNodeServices, FormData, $uibModalInstance, LeadsServices, Watch) {
            $scope.BookingDetail = ErpNodeServices.createForm(FormData.editBookingData());
            $scope.BookingDetail.promise.then(function (data) {
              $scope.bookingButton = Watch.validation(data);
              modelData.erp_createdById = ErpNodeServices.getName(modelData.erp_createdById);
              if (modelData.hasOwnProperty('erp_salesPersonId')) modelData.erp_salesPersonId = modelData.erp_salesPerson.erp_emp_name//GlobalData.getEmployee(modelData.erp_salesPersonId);
              data.setModel(modelData);
              $scope._data = data.data;
              Watch.makeActualCost(data.data);
            });
            $scope.$watch('_data', function (data) {
              Watch.makeActualCost(data);
              $scope.bookingButton = Watch.validation(data);
            }, true);

            $scope.updateBooking = function () {
              $scope.BookingDetail.promise.then(function (data) {
                $scope.Model = data.getModel();
                $scope.Model.erp_createdById = Authenticate.user().id;
                if ($scope.Model.erp_salesPersonId) $scope.Model.erp_salesPersonId = GlobalData.getEmployeeId($scope.Model.erp_salesPersonId);
                if ($scope.Model.erp_taxIncluded) $scope.Model.erp_taxIncluded = true;
                API.put('booking/' + modelData.erp_bookingId, $scope.Model).then(function (response) {
                  Notify.add('success', 'Success', response.data.message);
                  //LeadsServices.saveLead(leadId,LeadStatus);
                  $uibModalInstance.dismiss('cancel');
                  // $state.go('booking.list');
                }, function (error) {
                  Notify.add('error', 'Error', error);
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
  };


})();
(function () {

    'use strict';
    angular
        .module('erp_booking')
        .factory('BookingDetailService', BookingDetailService);

    function BookingDetailService(API, $q) {
        return {
            getBooking: getBooking
        }

        ////////////////////////////////////////////////
        // Locals



        /////////////////////////////////////////////////

        function getBooking(id) {
            var q = $q.defer();
            API.get('booking/' + id).then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        }

    };

})();
(function () {

    'use strict';
    angular
        .module('erp_booking')
        .controller('BookingCtrl', BookingCtrl);

    function BookingCtrl($scope, BookingService, $uibModal, Notify, ErpNodeServices, Authenticate) {
        ////////////////////////////////////////////////
        // Locals

        function makeString(value) {
            var name = value.replace(/ /g, "-").toLowerCase();
            return name;
        }

        function makeFilter(data, value) {
            var temp = new Array();
            if (data != undefined) {
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    if (makeString(data[i].erp_bookingStatus) == makeString(value)) {
                        temp.push(data[i]);
                    }
                }
            }
            return temp;
        }

        $scope.Date = {
            defaultDate: 0
            , hidePrevious: true
            , opts: {
                locale: { format: 'DD/MM/YYYY' },
                ranges: {
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }
            , date: {
                startDate: moment(),
                endDate: moment()
            }
        };
        $scope.showAll = function () {
            $scope.bookings = $scope.bookingsData;
        }
        $scope.Filter = function (value) {
            $scope.bookings = makeFilter($scope.bookingsData, value);
        };

        BookingService.getAllBookings().then(function (response) {
            $scope.bookingsData = response;
            $scope.bookings = response;
        });
        $scope.editStatus = function (item) {
            item.editStatusValue = true;
        }
        $scope.cancelStatus = function (item) {
            item.editStatusValue = false;
        }
        $scope.doneStatus = function (item, model) {
            var temp = {};
            if (model.erp_bookingStatus == 'Cancelled') {
                $scope.open(item);
            } else {
                model.erp_bookingId = item.erp_bookingId;
                BookingService.updateBooking(model).then(function (data) {
                    item.editStatusValue = false;
                    item.erp_bookingStatus = model.erp_bookingStatus;
                    Notify.add('success', 'Success', data.message);
                }, function (error) {
                    Notify.add('error', 'Error', error.data.errorMessgae);
                });
            }
        }
        $scope.open = function (item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: function ($scope, $uibModalInstance, API) {
                    $scope.selected = {};
                    $scope.ok = function () {
                        $uibModalInstance.close($scope.selected);
                        item.editStatusValue = false;
                        item.erp_bookingStatus = item.bookingStatus.model.erp_bookingStatus;
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    items: function () {
                        return $scope.selected;
                    }
                }
            });
            var temp = {};
            temp.erp_bookingId = item.erp_bookingId;
            temp.erp_bookingStatus = item.bookingStatus.model.erp_bookingStatus;
            temp.erp_bookingAmount = item.bookingStatus.model.erp_bookingAmount;
            modalInstance.result.then(function (selectedItem) {
                var model = {
                    erp_notes: "Cancelled Booking - " + selectedItem.model,
                    erp_source: "meeting",
                    erp_createdBy: Authenticate.user().id
                }
                BookingService.updateBooking(temp, model).then(function (data) {
                    item.editStatusValue = false;
                    item.erp_bookingStatus = temp.erp_bookingStatus;
                    Notify.add('success', 'Success', data.message);
                });
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        $scope.arrivalsFilter = function () {
            BookingService.fillerBooking($scope.Date.date).then(function (response) {
                $scope.bookingsData = response;
                $scope.bookings = response;
            });
        }
    }
})();


(function () {

    'use strict';
    angular
        .module('erp_booking')
        .factory('BookingService', BookingService);

    function BookingService(API, Session, $q, GlobalData, Authenticate) {
        return {
            getAllBookings: getAllBookings
            , updateBooking: updateBooking
            , fillerBooking: fillerBooking
        }

        ////////////////////////////////////////////////
        // Locals
        function checkUser(userId) {
            return superAdminIds.indexOf(userId) !== -1;
        }

        function createIsShow(data) {
            var len = data.length
                , userId = Authenticate.user().id
                , temp = new Array();
            for (var i = 0; i < len; i++) {
                data[i].isShow = true;
                data[i].bookingStatus = {
                    name: 'erp_bookingStatus'
                    , values: GlobalData.getBookingStatus('cancel')
                    , model: data[i].erp_bookingStatus
                };
                data[i].editStatusValue = false;
                temp.push(data[i]);
            }
            return temp;
        }

        function dateFormat(date) {
            return moment(date).format('DD/MM/YYYY')
        }

        /////////////////////////////////////////////////

        function getAllBookings() {
            var q = $q.defer()
                , url = ''
                , userId = Authenticate.user().id;
            if (superAdminIds.indexOf(userId) !== -1) {
                url = API.get('bookings');
            } else {
                url = API.get('bookings?salesPersonId=' + userId);
            }
            url.then(function (response) {
                q.resolve(createIsShow(response.data));
            });
            return q.promise;
        }

        function updateBooking(item, model) {
            var q = $q.defer()
                , url = '';
            if (item.hasOwnProperty('erp_tokenAmount')) {
                url = API.put('booking/' + item.erp_bookingId + '/status?bookingStatus=' + item.erp_bookingStatus + '&tokenAmount=' + item.erp_tokenAmount, model);
            } else {

                url = API.put('booking/' + item.erp_bookingId + '/status?bookingStatus=' + item.erp_bookingStatus, model);
            }
            url.then(function (response) {
                q.resolve(response.data);
            }, function (error) {
                q.reject(error)
            });
            return q.promise;
        }

        function fillerBooking(model) {
            var q = $q.defer()
                , startDate = dateFormat(model.startDate._d)
                , endDate = dateFormat(model.endDate._d)
                , _url = Authenticate.isAdmin() ? '' : '&salesPersonId=' + Authenticate.user().id;
            console.log(_url);
            API.get('bookings?fromDate=' + startDate + '&toDate=' + endDate + _url).then(function (response) {
                q.resolve(createIsShow(response.data));
            });
            return q.promise;
        };

    }
})();

