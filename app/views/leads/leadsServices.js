angular.module('sbAdminApp').factory('LeadsServices', function(API,$q,Notify) {
  return {
    getLeadStatus   :   getLeadStatus
    ,saveLead       :   saveLead
  };
  function saveLead(leadId,values){
    var model = {};
    model[values.name] = values.model;
    API.put('lead/'+leadId,model).then(function(data){
       Notify.add('success','Success','Lead Update');
    });
  }
  function getLeadStatus(key) {
    var q = $q.defer();
    API.get('/leadStatusValues').then(function(data){
       q.resolve(data.data);
    });
    return q.promise;
  }
/*{
    "erp_leadId" : 13,
    "erp_bookingName" : "booking_test",
    "erp_packageCode" : "P010",
    "erp_salesPersonId" : 10,
    "erp_roomCount" : 2,
    "erp_pickupLocation" : "NDLS",
    "erp_dropLocation" : "GOA",
    "erp_vehicle" : "Innova",
    "erp_vehicleCost": 10000,
    "erp_proposedPackageCost" : 100000,
    "erp_taxIncluded" : true,
    "erp_bookingStatus" : "New",
    "erp_inclusions" : "Dinner",
    "erp_exclusions" : "Lunch",
    "erp_createdById" : 10,
    "erp_hotelBookings" : [
   	 {
   		 "erp_hotelName" : "Beach resort",
   		 "erp_roomType" : "Deluxe",
   		 "erp_roomCost" : 10000,
   		 "erp_roomCount" : 2,
   		 "erp_nightsOfStay" : 2
   	 },{
   		 "erp_hotelName" : "Taj",
   		 "erp_roomType" : "Deluxe",
   		 "erp_roomCost" : 20000,
   		 "erp_roomCount" : 2,
   		 "erp_nightsOfStay" : 2
   	 }
    ],
    "erp_travelBookings" : [
   		 {
   			 "erp_travelType" : "Flight",
   			 "erp_travelCost" : 15000
   		 },{
   			 "erp_travelType" : "Train",
   			 "erp_travelCost" : 5000
   		 }
    ]}*/
});