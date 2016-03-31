angular.module('sbAdminApp').factory('FormData',function($q,GlobalData){
    return {
        addLeadData     :   addLeadData
        ,customer       :   customer
        ,additionalInformation  :   additionalInformation
        ,addBookingData     :   addBookingData
        ,addNote    :   addNote
        ,search     :   search
        ,addAttach  :   addAttach
    }
    function addAttach(){
        var addAttach = [{
                    label : 'Attachment Name'
                    ,name : 'erp_attachmentName'
                    ,type : 'erpText'
                },{
                    label : 'Attachment'
                    ,name : 'erp_attachment'
                    ,type : 'erpUpload'
                }];
        return addAttach;
    }
    function addLeadData(){
        var data = [{
                             label : 'Going to (multiple destinations)'
                             ,name : 'erp_destinations'
                             ,type : 'erpMultiSelect'
                             ,dropDown : $q.when(['One','Two','Five'])
                           },{
                             label : 'Departure'
                             ,name : 'erp_departureDate'
                             ,type : 'erpCalender'
                             ,defaultDate : 0 // 0 for current date -digit for previous date and digit for next date
                             ,hidePrevious : true
                           },{
                             label : 'People'
                             ,name : 'erp_people'
                             ,type : 'erpPeople'
                           },{
                             label : 'Nights'
                             ,name : 'erp_nights'
                             ,type : 'erpAddMore'
                             ,values : GlobalData.getNight()
                           },{
                             label : 'Leaving from'
                             ,name : 'erp_leavingFrom'
                             ,type : 'erpText'
                           },{
                             label : 'Source'
                             ,name : 'erp_leadSource'
                             ,type : 'erpSelect'
                             ,values : GlobalData.getLeadSource()
                           },{
                             label : 'Additional Requirement'
                             ,name : 'erp_additionalInfo'
                             ,type : 'erpTextarea'
                           }];
        return data;
    }
    function customer(){
        var customer = [{
            label : 'Name'
            ,name : 'erp_name'
            ,type : 'erpText'
          },{
           label : 'Country'
           ,name : 'erp_country'
           ,type : 'erpSelect'
           ,values : GlobalData.getCountry()
           ,model : 'India'
          },{
            label : 'City'
            ,name : 'erp_city'
            ,type : 'erpText'
          },{
            label : ''
            ,innerLabel : 'Email'
            ,name : 'erp_emailId'
            ,type : 'erpEmail'
          },{
            label : 'Phone'
            ,name : 'erp_phoneNo'
            ,type : 'erpPhone'
            ,code : '+91'//this.code
         }];
        return customer;
    }
    function additionalInformation(){
      var additionalInformation = [{label : 'Date of Birth'
            ,name : 'erp_dob'
            ,type : 'erpCalender'
            ,defaultDate : -20
          },{
            label : 'Social Network'
            ,name : 'erp_social_network'
            ,type : 'erpCheckbox'
            ,values : GlobalData.getSocial()
          }];
        return additionalInformation;
    }
    function addBookingData(){
      var addBookingData = [{
            label : 'Package Name'
            ,name : 'erp_bookingName'
            ,type : 'erpText'
          },{
            label : 'Code'
            ,name : 'erp_packageCode'
            ,type : 'erpText'
          },{
            label : 'Sales Person'
            ,name : 'erp_salesPersonId'
            ,type : 'erpSelect'
            ,values : GlobalData.getAllEmployee()
          },{
            label : 'Rooms'
            ,name : 'erp_roomCount'
            ,type : 'erpAddMore'
            //,values : GlobalData.getNight()
          },{
            label : 'Pick Up'
            ,name : 'erp_pickupLocation'
            ,type : 'erpText'
          },{
            label : 'Drop'
            ,name : 'erp_dropLocation'
            ,type : 'erpText'
          },{
            label : 'Vehicle'
            ,name : 'erp_vehicle'
            ,type : 'erpText'
          },{
            label : 'Vehicle Cost'
            ,name : 'erp_vehicleCost'
            ,type : 'erpNumber'
          },{
            label : 'Hotel Name'
            ,name : 'erp_hotelBookings'
            ,type : 'erpHotel'
          }/*,{
            label : 'Hotel Cost'
            ,name : 'erp_hotel_cost'
            ,type : 'erpText'
          },{
            label : 'Total Cost'
            ,name : 'erp_total_cost'
            ,type : 'erpText'
          }*/,{
            label : 'Total Sold Cost'
            ,name : 'erp_proposedPackageCost'
            ,type : 'erpNumber'
          },{
            label : 'Velvo/Aerteted/Train'
            ,name : 'erp_vehicle'
            ,type : 'erpSelect'
            ,values : GlobalData.getTransportType()
          },{
            label : 'Travel Bookings'
            ,name : 'erp_travelBookings'
            ,type : 'erpTravelBookings'
          }/*,{
            label : 'Cost'
            ,name : 'erp_vehicleCost'
            ,type : 'erpText'
          }*/,{
            label : 'Status'
            ,name : 'erp_bookingStatus'
            ,type : 'erpText'
          },{
                label : 'Inclusions'
                ,name : 'erp_inclusions'
                ,type : 'erpText'
          },{
                label : 'Exclusions'
                ,name : 'erp_exclusions'
                ,type : 'erpText'
          },{
            name : 'erp_taxIncluded'
            ,type : 'erpCheckbox'
            ,values : GlobalData.getTaxType()
          }];
        return addBookingData;
    }
    function addNote(){
      var addNote = [{
          label : 'Note'
          ,name : 'erp_notes'
          ,type : 'erpTextarea'
        }];
      return addNote;
    }
    function search(){
        var search = [{
                 label : 'Email'
                 ,name : 'emailId'
                 ,type : 'erpText'
               },{
                 label : 'Phone'
                 ,name : 'phoneNo'
                 ,type : 'erpPhone'
               },{
                 label : 'Lead Id'
                 ,name : 'leadId'
                 ,type : 'erpText'
       }];
       return search;
    }
});
