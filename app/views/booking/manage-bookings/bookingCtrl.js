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

