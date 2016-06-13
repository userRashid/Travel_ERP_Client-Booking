angular.module('sbAdminApp').factory('GlobalData',function($q,API,Session){
  return {
    getNight        :   getNight
    ,getSocial      :   getSocial
    ,getOldNew      :   getOldNew
    ,getTaxType     :   getTaxType
    ,getCountry     :   getCountry
    ,getNoteType    :   getNoteType
    ,getLeadSource  :   getLeadSource
    ,getDateFormat  :   getDateFormat
    ,getAllEmployee    :   getAllEmployee
    ,getTransportType  :   getTransportType
    ,getBookingStatus  :   getBookingStatus
    ,getEmailStatus    :   getEmailStatus
    ,getDateTimeFormat :   getDateTimeFormat
  };
  function getDateTimeFormat(){
    return 'dd/MM/yyyy HH:mm';
  }
  function getDateFormat(){
    return 'dd/MM/yyyy';
  }
  function getNoteType(){
    var data = ["Email","Phone","Meeting"];
    return $q.when(data);
  }
  function getBookingStatus(type){
    var data = ["Confirmed by Traveler","Token Amount Received","Total Amount Received"];
    if(type === 'cancel') data.push('Cancelled');
    return $q.when(data);
  }
  function getLeadSource(){
    var _q = $q.defer();
    API.get('leadSources').then(function(data){
        _q.resolve(data.data);
    });
    return _q.promise;
  };
  function getNight(){
    //Locals
    function createNight(n){
      var temp = new Array();
      for(var i=1; i<=n ;i++){
        //var obj = {};
        //obj.value = i;
        temp.push(i);
      }
      return temp;
    }

    return $q.when(createNight(12));
  }

  function getAllEmployee(){
      var p = $q.defer()
          ,temp = new Array()
          ,response = JSON.parse(Session.get('employee'))
          ,len = response.length;
        for(var i=0;i<len;i++){
            temp.push(response[i].erp_emp_name);
        }
        p.resolve(temp);
        return p.promise;
  }

  function getTransportType(){
    return $q.when(['Velvo','Aerteted','Train']);
  }

  function getCountry(){
    //Locals
    function getCountryList(){
      var temp = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];
      return temp;
    }
    return $q.when(getCountryList());
  }

  function getSocial(){
    var social = [{label : 'WhatsApp',value:'whatsapp'},{label : 'Viber',value:'viber'},{label : 'Skype',value:'skype'},{label : 'Facebook',value:'fb'}];
    return $q.when(social);
  }
  function getOldNew(){
    var social = [{label : 'New',value:'new', model : true},{label : 'Old',value:'old'}];
    return $q.when(social);
  }
  function getTaxType(){
    var taxType = [{label : 'Tax Included',value:'tax_included'}];
    return $q.when(taxType);
  }

  function getEmailStatus(){
    var status = ['Follow Up','Meeting','Phone Call']
    return $q.when(status);
  }
});
