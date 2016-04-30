angular.module('sbAdminApp').service('Watch',function(){
    return {
        validation    :   validation
        ,makeActualCost : makeActualCost
        ,showAmountReceived : showAmountReceived
        ,setRooms   :   setRooms
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
            if(data[i].name == 'erp_vehicleCost' || data[i].name == 'erp_hotelBookings' || data[i].name == 'erp_travelBookings'){
                cost.push(data[i]);
            } else if(data[i].name == 'erp_actualCost'){
                actualCostItem = data[i];
            }
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
                            actualCost = actualCost + Number(_data[z].erp_roomCost);
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
            ,amountReceived
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
})