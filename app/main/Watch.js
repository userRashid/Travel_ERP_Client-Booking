angular.module('sbAdminApp').service('Watch',function(){
    return {
        validation    :   validation
        ,makeActualCost : makeActualCost
        ,showAmountReceived : showAmountReceived
        ,setRooms   :   setRooms
        ,setcustomerCountry :   setcustomerCountry
    }

    function validation(data){
        var len = data.length
            ,temp = new Array()
            ,_temp = new Array();
        for(var i=0;i<len;i++){
            if(data[i].mandatory){
                temp.push(data[i]);
            }
        }
        for(var j=0;j<temp.length;j++){
            if(temp[j].hasOwnProperty('model') && temp[j].model != '') _temp.push(temp[j]);
        }
        if(temp.length == _temp.length) return true;
        else return false;
    }

    function makeActualCost(data){
        var len = data.length
            ,cost = new Array()
            ,actualCost = 0
            ,actualCostItem;
        for(var i=0;i<len;i++){
            if(data[i].name == 'erp_vehicleCost' || data[i].name == 'erp_hotelBookings' || data[i].name == 'erp_travelBookings' || data[i].name == 'erp_miscellaneousCost'){
                cost.push(data[i]);
            } else if(data[i].name == 'erp_actualCost'){
                actualCostItem = data[i];
            }
        }
        ////////////// Locals

        function getHotelCost(data){
            var roomCount = 1
                ,roomCost = data.erp_roomCost
                ,nightsOfStay = 1;
            if(data.hasOwnProperty('erp_roomCount') && data.erp_roomCount != '') roomCount = data.erp_roomCount;
          //  if(data.hasOwnProperty('erp_nightsOfStay') && data.erp_nightsOfStay != '') nightsOfStay = data.erp_nightsOfStay;
            if(data.hasOwnProperty('checkin') && data.checkin.end.model != undefined && data.checkin.start.model != undefined){
                nightsOfStay = parseInt((data.checkin.end.model - data.checkin.start.model) / (24 * 3600 * 1000));
             }
            var cost =  roomCost*roomCount*nightsOfStay;
            return cost;
        }

        for(var j=0;j<cost.length;j++){
            if(cost[j].hasOwnProperty('model')){
                if(typeof(cost[j].model) == 'string'){
                    actualCost = actualCost + Number(cost[j].model);
                } else {
                    var _data = cost[j].model
                        ,_len = _data.length;
                    for(var z=0; z<_len;z++){
                        if(_data[z].hasOwnProperty('erp_roomCost') && _data[z].erp_roomCost != ''){
                            actualCost = actualCost + Number(getHotelCost(_data[z]));
                        } else if(_data[z].hasOwnProperty('erp_travelCost') && _data[z].erp_travelCost != ''){
                            actualCost = actualCost + Number(_data[z].erp_travelCost);
                        }
                    }
                }
            }
        }
        actualCostItem.model = actualCost;
    }
    function showAmountReceived(data){
        var len = data.length
            ,amountReceived = {}
            ,value = false;
        for(var i=0;i<len;i++){
            if(data[i].name == 'erp_bookingStatus'){
                if(data[i].model == 'Token Amount Received' || data[i].model == 'Total Amount Received') value = true;
                else value = false;
            } else if(data[i].name == 'erp_bookingAmount'){
                amountReceived = data[i];
            }
        }
        amountReceived.isShow = value;
    }

    function setRooms(data){
        var len = data.length
            ,roomCount;
        for(var i=0;i<len;i++){
            if(data[i].name == 'erp_roomCount'){
                roomCount = data[i].model;
            } else if(data[i].name == 'erp_hotelBookings'){
                if(data[i].hasOwnProperty('model')){
                    var _data = data[i].model
                        ,_len = _data.length;
                    for(var z=0; z<_len;z++){
                        _data[z].erp_roomCount = roomCount;
                    }
                }
            }
        }
    }

    function setcustomerCountry(data){
         var len = data.length;
        for(var i=0;i<len;i++){
            if(data[i].name == 'erp_country'){
                country = data[i].model;
            }
            if(data[i].name == "erp_phoneNo"){
                setData(data[i],country);
            }
        }
    }

    function setData(data,country){
        if(country == "India"){
            data.validation = {
            maxPhoneNoLength   : "10",
            phoneNumberPattern : /^[7|8|9]\d*/
            }
        }else{
            data.validation={
            maxPhoneNoLength  : ""
            }
        }
    }
})