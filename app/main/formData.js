angular.module('sbAdminApp').factory('FormData',function($q,GlobalData,Authenticate,Watch){
    return {
        addLeadData     :   addLeadData
        ,customer       :   customer
        ,additionalInformation  :   additionalInformation
        ,addBookingData     :   addBookingData
        ,addNote    :   addNote
        ,search     :   search
        ,addAttach  :   addAttach
        ,getCity    :   getCity
    }
    function addAttach(){
        var addAttach = [{
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
                             ,dropDown : $q.when(getCity())
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
                             //,values : GlobalData.getNight()
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
            ,mandatory : true
          }/*,{
            label : 'Package Code'
            ,name : 'erp_packageCode'
            ,type : 'erpText'
          }*/,{
            label : 'Sales Person'
            ,name : 'erp_salesPersonId'
            ,type : 'erpSelect'
            ,values : GlobalData.getAllEmployee()
            ,model : Authenticate.user().name
            ,mandatory : true
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
            label : 'Transport/Vehicle Given (optional)'
            ,name : 'erp_vehicle'
            ,type : 'erpText'
          },{
            label : 'Total Transport/Vehicle Cost'
            ,name : 'erp_vehicleCost'
            ,type : 'erpNumber'
          },{
            label : 'Hotel Details'
            ,name : 'erp_hotelBookings'
            ,type : 'erpHotel'
            ,mode : 'full'
          }/*,{
            label : 'Hotel Cost'
            ,name : 'erp_hotel_cost'
            ,type : 'erpText'
          },{
            label : 'Total Cost'
            ,name : 'erp_total_cost'
            ,type : 'erpText'
          },{
            label : 'Volvo/Airticket/Train'
            ,name : 'erp_vehicle'
            ,type : 'erpSelect'
            ,values : GlobalData.getTransportType()
          },*/,{
            label : 'Ticketing Details'
            ,name : 'erp_travelBookings'
            ,type : 'erpTravelBookings'
          }/*,{
            label : 'Cost'
            ,name : 'erp_vehicleCost'
            ,type : 'erpText'
          }*/,{
                label : 'Inclusions'
                ,name : 'erp_inclusions'
                ,type : 'erpTextarea'
                ,isCheckbox : true
                ,checkboxModel : ''
                ,checkboxLabel : 'Honeymoon'
                ,checkboxData : 'Flower Decorated bed, Honeymoon Cake, Candle Light Dinner , '
          },{
                label : 'Exclusions'
                ,name : 'erp_exclusions'
                ,type : 'erpTextarea'
          },{
            name : 'erp_taxIncluded'
            ,type : 'erpCheckbox'
            ,values : GlobalData.getTaxType()
          },{
            label : 'Total Sold Cost'
            ,name : 'erp_proposedPackageCost'
            ,type : 'erpNumber'
          },{
            label : 'Actual Cost'
            ,name : 'erp_actualCost'
            ,type : 'erpText'
            ,isDisable : true
          },{
           name : 'erp_bookingStatus'
           ,type : 'erpBookingStatus'
           ,values : GlobalData.getBookingStatus()
           ,model : 'Confirmed by Traveler'
         },{
            label : 'Miscellaneous cost'
            ,name : 'erp_miscellaneousCost'
            ,type : 'erpText'
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
    function getCity(){
        var city = ["North and Middle Andaman","South Andaman","Nicobar","Adilabad","Anantapur","Chittoor","East Godavari","Guntur","Hyderabad","Kadapa","Karimnagar","Khammam","Krishna","Kurnool","Mahbubnagar","Medak","Nalgonda","Nellore","Nizamabad","Prakasam","Rangareddi","Srikakulam","Vishakhapatnam","Vizianagaram","Warangal","West Godavari","","Anjaw","Changlang","East Kameng","Lohit","Lower Subansiri","Papum Pare","Tirap","Dibang Valley","Upper Subansiri","West Kameng","","Barpeta","Bongaigaon","Cachar","Darrang","Dhemaji","Dhubri","Dibrugarh","Goalpara","Golaghat","Hailakandi","Jorhat","Karbi Anglong","Karimganj","Kokrajhar","Lakhimpur","Marigaon","Nagaon","Nalbari","North Cachar Hills","Sibsagar","Sonitpur","Tinsukia","","Araria","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar","Darbhanga","Purba Champaran","Gaya","Gopalganj","Jamui","Jehanabad","Khagaria","Kishanganj","Kaimur","Katihar","Lakhisarai","Madhubani","Munger","Madhepura","Muzaffarpur","Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa","Samastipur","Sheohar","Sheikhpura","Saran","Sitamarhi","Supaul","Siwan","Vaishali","Pashchim Champaran","","","Bastar","Bilaspur","Dantewada","Dhamtari","Durg","Jashpur","Janjgir-Champa","Korba","Koriya","Kanker","Kawardha","Mahasamund","Raigarh","Rajnandgaon","Raipur","Surguja","","","Diu","Daman","","Central Delhi","East Delhi","New Delhi","North Delhi","North East Delhi","North West Delhi","South Delhi","South West Delhi","West Delhi","","North Goa","South Goa","","Ahmedabad","Amreli District","Anand","Banaskantha","Bharuch","Bhavnagar","Dahod","The Dangs","Gandhinagar","Jamnagar","Junagadh","Kutch","Kheda","Mehsana","Narmada","Navsari","Patan","Panchmahal","Porbandar","Rajkot","Sabarkantha","Surendranagar","Surat","Vadodara","Valsad","","Ambala","Bhiwani","Faridabad","Fatehabad","Gurgaon","Hissar","Jhajjar","Jind","Karnal","Kaithal","Kurukshetra","Mahendragarh","Mewat","Panchkula","Panipat","Rewari","Rohtak","Sirsa","Sonepat","Yamuna Nagar","Palwal","","Bilaspur","Chamba","Hamirpur","Kangra","Kinnaur","Kulu","Lahaul and Spiti","Mandi","Shimla","Sirmaur","Solan","Una","","Anantnag","Badgam","Bandipore","Baramula","Doda","Jammu","Kargil","Kathua","Kupwara","Leh","Poonch","Pulwama","Rajauri","Srinagar","Samba","Udhampur","","Bokaro","Chatra","Deoghar","Dhanbad","Dumka","Purba Singhbhum","Garhwa","Giridih","Godda","Gumla","Hazaribagh","Koderma","Lohardaga","Pakur","Palamu","Ranchi","Sahibganj","Seraikela and Kharsawan","Pashchim Singhbhum","Ramgarh","","Bidar","Belgaum","Bijapur","Bagalkot","Bellary","Bangalore Rural District","Bangalore Urban District","Chamarajnagar","Chikmagalur","Chitradurga","Davanagere","Dharwad","Dakshina Kannada","Gadag","Gulbarga","Hassan","Haveri District","Kodagu","Kolar","Koppal","Mandya","Mysore","Raichur","Shimoga","Tumkur","Udupi","Uttara Kannada","Ramanagara","Chikballapur","Yadagiri","","Alappuzha","Ernakulam","Idukki","Kollam","Kannur","Kasaragod","Kottayam","Kozhikode","Malappuram","Palakkad","Pathanamthitta","Thrissur","Thiruvananthapuram","Wayanad","","","Alirajpur","Anuppur","Ashok Nagar","Balaghat","Barwani","Betul","Bhind","Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Datia","Dewas","Dhar","Dindori","Guna","Gwalior","Harda","Hoshangabad","Indore","Jabalpur","Jhabua","Katni","Khandwa","Khargone","Mandla","Mandsaur","Morena","Narsinghpur","Neemuch","Panna","Rewa","Rajgarh","Ratlam","Raisen","Sagar","Satna","Sehore","Seoni","Shahdol","Shajapur","Sheopur","Shivpuri","Sidhi","Singrauli","Tikamgarh","Ujjain","Umaria","Vidisha","","Ahmednagar","Akola","Amrawati","Aurangabad","Bhandara","Beed","Buldhana","Chandrapur","Dhule","Gadchiroli","Gondiya","Hingoli","Jalgaon","Jalna","Kolhapur","Latur","Mumbai City","Mumbai suburban","Nandurbar","Nanded","Nagpur","Nashik","Osmanabad","Parbhani","Pune","Raigad","Ratnagiri","Sindhudurg","Sangli","Solapur","Satara","Thane","Wardha","Washim","Yavatmal","","Bishnupur","Churachandpur","Chandel","Imphal East","Senapati","Tamenglong","Thoubal","Ukhrul","Imphal West","","East Garo Hills","East Khasi Hills","Jaintia Hills","Ri-Bhoi","South Garo Hills","West Garo Hills","West Khasi Hills","","Aizawl","Champhai","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha","Serchhip","","Dimapur","Kohima","Mokokchung","Mon","Phek","Tuensang","Wokha","Zunheboto","","Angul","Boudh","Bhadrak","Bolangir","Bargarh","Baleswar","Cuttack","Debagarh","Dhenkanal","Ganjam","Gajapati","Jharsuguda","Jajapur","Jagatsinghpur","Khordha","Kendujhar","Kalahandi","Kandhamal","Koraput","Kendrapara","Malkangiri","Mayurbhanj","Nabarangpur","Nuapada","Nayagarh","Puri","Rayagada","Sambalpur","Subarnapur","Sundargarh","","Karaikal","Mahe","Puducherry","Yanam","","Amritsar","Bathinda","Firozpur","Faridkot","Fatehgarh Sahib","Gurdaspur","Hoshiarpur","Jalandhar","Kapurthala","Ludhiana","Mansa","Moga","Mukatsar","Nawan Shehar","Patiala","Rupnagar","Sangrur","","Ajmer","Alwar","Bikaner","Barmer","Banswara","Bharatpur","Baran","Bundi","Bhilwara","Churu","Chittorgarh","Dausa","Dholpur","Dungapur","Ganganagar","Hanumangarh","Juhnjhunun","Jalore","Jodhpur","Jaipur","Jaisalmer","Jhalawar","Karauli","Kota","Nagaur","Pali","Pratapgarh","Rajsamand","Sikar","Sawai Madhopur","Sirohi","Tonk","Udaipur","","East Sikkim","North Sikkim","South Sikkim","West Sikkim","","Ariyalur","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kanchipuram","Kanyakumari","Karur","Madurai","Nagapattinam","The Nilgiris","Namakkal","Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivagangai","Tiruppur","Tiruchirappalli","Theni","Tirunelveli","Thanjavur","Thoothukudi","Thiruvallur","Thiruvarur","Tiruvannamalai","Vellore","Villupuram","","Dhalai","North Tripura","South Tripura","West Tripura","","Almora","Bageshwar","Chamoli","Champawat","Dehradun","Haridwar","Nainital","Pauri Garhwal","Pithoragharh","Rudraprayag","Tehri Garhwal","Udham Singh Nagar","Uttarkashi","","Agra","Allahabad","Aligarh","Ambedkar Nagar","Auraiya","Azamgarh","Barabanki","Badaun","Bagpat","Bahraich","Bijnor","Ballia","Banda","Balrampur","Bareilly","Basti","Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Kanshiram Nagar","Etawah","Firozabad","Farrukhabad","Fatehpur","Faizabad","Gautam Buddha Nagar","Gonda","Ghazipur","Gorkakhpur","Ghaziabad","Hamirpur","Hardoi","Mahamaya Nagar","Jhansi","Jalaun","Jyotiba Phule Nagar","Jaunpur District","Kanpur Dehat","Kannauj","Kanpur Nagar","Kaushambi","Kushinagar","Lalitpur","Lakhimpur Kheri","Lucknow","Mau","Meerut","Maharajganj","Mahoba","Mirzapur","Moradabad","Mainpuri","Mathura","Muzaffarnagar","Pilibhit","Pratapgarh","Rampur","Rae Bareli","Saharanpur","Sitapur","Shahjahanpur","Sant Kabir Nagar","Siddharthnagar","Sonbhadra","Sant Ravidas Nagar","Sultanpur","Shravasti","Unnao","Varanasi","","Birbhum","Bankura","Bardhaman","Darjeeling","Dakshin Dinajpur","Hooghly","Howrah","Jalpaiguri","Cooch Behar","Kolkata","Malda","Midnapore","Murshidabad","Nadia","North 24 Parganas","South 24 Parganas","Purulia","Uttar Dinajpur"];
        return city;
    }
});
