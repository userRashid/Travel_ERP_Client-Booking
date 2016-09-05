'use strict';
angular.module('sbAdminApp').controller('ManageLeadsCtrl', function ($scope,API,ErpNodeServices,FormData,Session,$location){
    //var json = [{"erp_id":2,"erp_customerId":20,"erp_destinations":"shimla,manali","erp_adultCount":2,"erp_kidsCount":1,"erp_departureDate":"05/06/2016","erp_nights":3,"erp_leavingFrom":"New Delhi","erp_leadSource":"MMT","erp_additionalInfo":"Vegetarian food","erp_leadStatus":"New","erp_createdBy":9,"erp_assignedTo":9,"erp_creationDate":"26/12/2015","erp_lastUpdateTime":"26/12/2015"},{"erp_id":13,"erp_customerId":20,"erp_destinations":"shimla,manali","erp_adultCount":2,"erp_kidsCount":1,"erp_departureDate":"05/03/2024","erp_nights":3,"erp_leavingFrom":"New Delhi","erp_leadSource":"HT","erp_additionalInfo":"Vegetarian food","erp_leadStatus":"New","erp_createdBy":9,"erp_assignedTo":9,"erp_creationDate":"26/12/2015","erp_lastUpdateTime":"26/12/2015"},{"erp_id":14,"erp_customerId":20,"erp_destinations":"shimla,manali","erp_adultCount":2,"erp_kidsCount":0,"erp_departureDate":"05/06/2016","erp_nights":3,"erp_leavingFrom":"New Delhi","erp_leadSource":"HT","erp_additionalInfo":"Vegetarian food","erp_leadStatus":"New","erp_createdBy":11,"erp_assignedTo":9,"erp_creationDate":"17/01/2016","erp_lastUpdateTime":"26/12/2015"},{"erp_id":15,"erp_customerId":20,"erp_destinations":"shimla,manali","erp_adultCount":2,"erp_kidsCount":1,"erp_departureDate":"05/06/2016","erp_nights":3,"erp_leavingFrom":"New Delhi","erp_leadSource":"HT","erp_additionalInfo":"Vegetarian food","erp_leadStatus":"New","erp_createdBy":9,"erp_assignedTo":9,"erp_creationDate":"06/01/2016","erp_lastUpdateTime":"06/01/2016"},{"erp_id":18,"erp_customerId":20,"erp_destinations":"shimla,manali","erp_adultCount":2,"erp_kidsCount":1,"erp_departureDate":"05/06/2016","erp_nights":3,"erp_leavingFrom":"New Delhi","erp_leadSource":"HT","erp_additionalInfo":"Vegetarian food","erp_leadStatus":"New","erp_createdBy":9,"erp_assignedTo":9,"erp_creationDate":"17/01/2016","erp_lastUpdateTime":"17/01/2016"},{"erp_id":19,"erp_customerId":20,"erp_destinations":"shimla,manali,kasaul","erp_adultCount":3,"erp_kidsCount":1,"erp_departureDate":"05/07/2016","erp_nights":3,"erp_leavingFrom":"New Delhi","erp_leadSource":"HT","erp_additionalInfo":"Vegetarian food and alcohol","erp_leadStatus":"Hot","erp_createdBy":9,"erp_assignedTo":10,"erp_creationDate":"17/01/2016","erp_lastUpdateTime":"17/01/2016"},{"erp_id":20,"erp_customerId":20,"erp_destinations":"shimla,manali","erp_adultCount":2,"erp_kidsCount":1,"erp_departureDate":"05/06/2016","erp_nights":3,"erp_leavingFrom":"New Delhi","erp_leadSource":"HT","erp_additionalInfo":"Vegetarian food","erp_leadStatus":"New","erp_createdBy":9,"erp_assignedTo":9,"erp_creationDate":"17/01/2016","erp_lastUpdateTime":"17/01/2016"},{"erp_id":21,"erp_customerId":20,"erp_destinations":"shimla,manali","erp_adultCount":2,"erp_kidsCount":1,"erp_departureDate":"05/06/2016","erp_nights":3,"erp_leavingFrom":"New Delhi","erp_leadSource":"HT","erp_additionalInfo":"Vegetarian food","erp_leadStatus":"New","erp_createdBy":9,"erp_assignedTo":9,"erp_creationDate":"17/01/2016","erp_lastUpdateTime":"17/01/2016"},{"erp_id":25,"erp_customerId":20,"erp_destinations":"ONE,TWO,FIVE","erp_adultCount":3,"erp_kidsCount":0,"erp_departureDate":"28/01/2016","erp_nights":1,"erp_leavingFrom":"Noida","erp_leadSource":"HT","erp_additionalInfo":null,"erp_leadStatus":"New","erp_createdBy":9,"erp_assignedTo":9,"erp_creationDate":"18/01/2016","erp_lastUpdateTime":"18/01/2016"},{"erp_id":26,"erp_customerId":20,"erp_destinations":"ONE","erp_adultCount":3,"erp_kidsCount":1,"erp_departureDate":"28/01/2016","erp_nights":1,"erp_leavingFrom":"Noida","erp_leadSource":"Ht","erp_additionalInfo":null,"erp_leadStatus":"New","erp_createdBy":9,"erp_assignedTo":9,"erp_creationDate":"18/01/2016","erp_lastUpdateTime":"18/01/2016"}];
    API.get('leadSummary?assignedTo='+Session.get('id')).then(function(response){
        $scope.allLeads = response.data;
    });
    //$scope.allLeads = json;
    $scope.Search = ErpNodeServices.createForm(FormData.search());
    $scope.makeSearch = function(){
        $scope.Search.promise.then(function(data){
            var model = data.getModel();
            ErpNodeServices.Search(model).then(function(_data){
                $scope.allLeads = _data.data;
            });
        });
    }
    $scope.dateSearch = '';
    $scope.export = function(){
        API.get('lead/export?assignedTo='+Session.get('id')).then(function(response){
             var anchor = angular.element('<a/>');
                 anchor.attr({
                     href: 'data:attachment/csv;charset=utf-8,' + encodeURI(response.data),
                     target: '_blank',
                     download: 'leads.csv'
                 })[0].click();

         });
    }
    $scope.showFilter = false;
    $scope.toggleFilter = function(){
        $scope.showFilter = !$scope.showFilter;
    }
    $scope.goToLeadDetail = function(lead_id){
        $location.path('leads/manage-leads/'+lead_id);
    }
});
