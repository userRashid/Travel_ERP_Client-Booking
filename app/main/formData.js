angular.module('sbAdminApp').factory('FormData', function ($q, GlobalData, Authenticate, Watch, $http) {
  return {
    addLeadData: addLeadData
    , customer: customer
    , additionalInformation: additionalInformation
    , addBookingData: addBookingData
    , addNote: addNote
    , search: search
    , addAttach: addAttach
    , getCity: getCity
    , erpAlert: erpAlert
    , erpActivity: erpActivity
    , editBookingData: editBookingData
    , employee: employee
  }

  function erpActivity() {
    var erpActivity = [{
      label: 'Activity Type'
      , name: 'erp_activity'
      , type: 'erpSelect'
      , values: $q.when(['Email', 'Note', 'Phone'])
    }];
    return erpActivity;
  }

  function erpAlert() {
    var erpAlert = [{
      label: ''
      , name: 'erp_datetime'
      , type: 'erpDateTime'
      , minuteStep: 15
    }, {
      label: ''
      , name: 'erp_description'
      , type: 'erpTextarea'
      , placeholder: 'Description...'
    }]
    return erpAlert;
  }

  function addAttach() {
    var addAttach = [{
      label: 'Attachment'
      , name: 'erp_attachment'
      , type: 'erpUpload'
    }];
    return addAttach;
  }
  function addLeadData() {
    var data = [{
      label: 'Going to (multiple destinations)'
      , name: 'erp_destinations'
      , type: 'erpMultiSelect'
      , dropDown: getCity()
    }, {
      label: 'Departure'
      , name: 'erp_departureDate'
      , type: 'erpCalender'
      , defaultDate: 0 // 0 for current date -digit for previous date and digit for next date
      , hidePrevious: true
    }, {
      label: 'People'
      , name: 'erp_people'
      , type: 'erpPeople'
    }, {
      label: 'Nights'
      , name: 'erp_nights'
      , type: 'erpAddMore'
    }, {
      label: 'Leaving from'
      , name: 'erp_leavingFrom'
      , type: 'erpMultiSelect'
      , dropDown: getCity()
    }, {
      label: 'Source'
      , name: 'erp_leadSource'
      , type: 'erpSelect'
      , values: GlobalData.getLeadSource()
    }, {
      label: 'Additional Requirement'
      , name: 'erp_additionalInfo'
      , type: 'erpTextarea'
    }];
    return data;
  }
  function customer() {
    var customer = [{
      label: 'Name'
      , name: 'erp_name'
      , type: 'erpText'
    }, {
      label: 'Country'
      , name: 'erp_country'
      , type: 'erpSelect'
      , values: GlobalData.getCountry()
      , model: 'India'
    }, {
      label: 'City'
      , name: 'erp_city'
      , type: 'erpText'
    }, {
      label: ''
      , innerLabel: 'Email'
      , name: 'erp_emailId'
      , type: 'erpEmail'
    }, {
      label: 'Phone'
      , name: 'erp_phoneNo'
      , type: 'erpPhone'
      , code: '+91'//this.code
    }];
    return customer;
  }

  function employee() {
    var employee = [{
      label: 'Name'
      , name: 'erp_name'
      , type: 'erpText'
    }, {
      label: ''
      , innerLabel: 'Email'
      , name: 'erp_emailId'
      , type: 'erpEmail'
    }, {
      label: 'Username'
      , name: 'erp_userName'
      , type: 'erpText'
    }, {
      label: 'Roles'
      , name: 'erp_roles'
      , type: 'erpText'
    }, {
      label: 'Teams'
      , name: 'erp_teams'
      , type: 'erpText'
    }];
    return employee;
  }

  function additionalInformation() {
    var additionalInformation = [{
      label: 'Date of Birth'
      , name: 'erp_dob'
      , type: 'erpCalender'
      , defaultDate: -20
    }, {
      label: 'Social Network'
      , name: 'erp_social_network'
      , type: 'erpCheckbox'
      , values: GlobalData.getSocial()
    }];
    return additionalInformation;
  }
  function addBookingData() {
    var addBookingData = [{
      label: 'Package Name'
      , name: 'erp_bookingName'
      , type: 'erpText'
      , mandatory: true
    }, {
      label: 'Pick Up'
      , name: 'erp_pickupLocation'
      , type: 'erpText'
    }, {
      label: 'Drop'
      , name: 'erp_dropLocation'
      , type: 'erpText'
    }, {
      label: 'Transport/Vehicle Given (optional)'
      , name: 'erp_vehicle'
      , type: 'erpText' //TODO drop down , values coming from service
    }, {
      label: 'Hotel Details'
      , name: 'erp_hotelBookings'
      , type: 'erpHotel'
      , mode: 'full'
    }, {
      label: 'Ticketing Details'
      , name: 'erp_travelBookings'
      , type: 'erpTravelBookings'
    }, {
      label: 'Inclusions'
      , name: 'erp_inclusions'
      , type: 'erpTextarea'
      , isCheckbox: true
      , checkboxModel: ''
      , checkboxLabel: 'Honeymoon'
      , checkboxData: 'Flower Decorated bed, Honeymoon Cake, Candle Light Dinner , '
    }, {
      label: 'Exclusions'
      , name: 'erp_exclusions'
      , type: 'erpTextarea'
    }, {
      name: 'erp_bookingStatus'
      , type: 'erpBookingStatus'
      , values: GlobalData.getBookingStatus()
      , model: 'Confirmed by Traveler'
    }, {
      label: 'Total Sold Cost'
      , name: 'erp_proposedPackageCost'
      , type: 'erpNumber'
    }, {
      name: 'erp_taxIncluded'
      , type: 'erpCheckbox'
      , values: GlobalData.getTaxType()
    }, {
      label: 'Sales Person'
      , name: 'erp_salesPersonId'
      , type: 'erpSelect'
      , values: GlobalData.getAllEmployee()
      , model: Authenticate.user().name
      , mandatory: true
    }];
    return addBookingData;
  }

  function editBookingData() {
    var editBookingData = [{
      label: 'Package Name'
      , name: 'erp_bookingName'
      , type: 'erpText'
      , mandatory: true
    }, {
      label: 'Sales Person'
      , name: 'erp_salesPersonId'
      , type: 'erpSelect'
      , values: GlobalData.getAllEmployee()
      , model: Authenticate.user().name
      , mandatory: true
    }, {
      label: 'Pick Up'
      , name: 'erp_pickupLocation'
      , type: 'erpText'
    }, {
      label: 'Drop'
      , name: 'erp_dropLocation'
      , type: 'erpText'
    }, {
      label: 'Transport/Vehicle Given (optional)'
      , name: 'erp_vehicle'
      , type: 'erpText'
    }, {
      label: 'Total Transport/Vehicle Cost'
      , name: 'erp_vehicleCost'
      , type: 'erpNumber'
    }, {
      label: 'Hotel Details'
      , name: 'erp_hotelBookings'
      , type: 'erpHotel'
      , mode: 'full'
      , isEdit: true
    }, {
      label: 'Ticketing Details'
      , name: 'erp_travelBookings'
      , type: 'erpTravelBookings'
    }/*,{
            label : 'Cost'
            ,name : 'erp_vehicleCost'
            ,type : 'erpText'
          }*/, {
      label: 'Inclusions'
      , name: 'erp_inclusions'
      , type: 'erpTextarea'
      , isCheckbox: true
      , checkboxModel: ''
      , checkboxLabel: 'Honeymoon'
      , checkboxData: 'Flower Decorated bed, Honeymoon Cake, Candle Light Dinner , '
    }, {
      label: 'Exclusions'
      , name: 'erp_exclusions'
      , type: 'erpTextarea'
    }, {
      name: 'erp_taxIncluded'
      , type: 'erpCheckbox'
      , values: GlobalData.getTaxType()
    }, {
      label: 'Total Sold Cost'
      , name: 'erp_proposedPackageCost'
      , type: 'erpNumber'
    }, {
      label: 'Actual Cost'
      , name: 'erp_actualCost'
      , type: 'erpText'
      , isDisable: true
    }, {
      name: 'erp_bookingStatus'
      , type: 'erpBookingStatus'
      , values: GlobalData.getBookingStatus()
      , model: 'Confirmed by Traveler'
    }, {
      label: 'Miscellaneous cost'
      , name: 'erp_additionalCost'
      , type: 'erpNumber'
    }];
    return editBookingData;
  }
  function addNote() {
    var addNote = [{
      label: 'Note'
      , name: 'erp_notes'
      , type: 'erpTextarea'
    }];
    return addNote;
  }
  function search() {
    var search = [{
      label: 'Email'
      , name: 'emailId'
      , type: 'erpText'
    }, {
      label: 'Phone'
      , name: 'phoneNo'
      , type: 'erpPhone'
    }, {
      label: 'Lead Id'
      , name: 'leadId'
      , type: 'erpText'
    }];
    return search;
  }
  function getCity() {
    var _q = $q.defer();
    $http.get('city-data.json').then(function (response) {
      _q.resolve(response.data);
    })
    return _q.promise;
  }
});
