angular.module('sbAdminApp').factory('Watch',function(){
    var roomCount;
    return {
        setRooms    :   setRooms
        ,getRooms   :   getRooms
    }

    function setRooms(data){
        roomCount = data;
    }
    function getRooms(){
        return roomCount;
    }
})