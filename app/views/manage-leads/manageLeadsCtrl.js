(function () {

    'use strict';
    angular
        .module('erp_leads')
        .controller('ManageLeadsCtrl', ManageLeadsCtrl)
    function ManageLeadsCtrl($scope, API, ErpNodeServices, FormData, Session, $location) {

        API.get('leadSummary?assignedTo=' + Session.get('id')).then(function (response) {
            $scope.allLeads = response.data;
        });
        $scope.Search = ErpNodeServices.createForm(FormData.search());
        $scope.makeSearch = function () {
            $scope.Search.promise.then(function (data) {
                var model = data.getModel();
                ErpNodeServices.Search(model).then(function (_data) {
                    $scope.allLeads = _data.data;
                });
            });
        }
        $scope.dateSearch = '';
        $scope.export = function () {
            API.get('lead/export?assignedTo=' + Session.get('id')).then(function (response) {
                var anchor = angular.element('<a/>');
                anchor.attr({
                    href: 'data:attachment/csv;charset=utf-8,' + encodeURI(response.data),
                    target: '_blank',
                    download: 'leads.csv'
                })[0].click();

            });
        }
        $scope.showFilter = false;
        $scope.toggleFilter = function () {
            $scope.showFilter = !$scope.showFilter;
        }
        $scope.goToLeadDetail = function (lead_id) {
            $location.path('leads/manage-leads/' + lead_id);
        }
    };


})();