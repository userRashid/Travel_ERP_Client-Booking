angular.module('erp_component').directive('erpHotel',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpHotel'
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope,Watch,GlobalData,$timeout){
    function dateOption(){
        return {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            startingDay: 1,
            showWeeks : false
        }
    }
    function getHotelRow(){
        var hotelRowData = [{
            label : 'Name'
            ,type : 'text'
            ,name : 'erp_hotelName'
            ,column : '3'
        },{
            label : 'Hotel Category'
            ,type : 'select'
            ,name : 'erp_hotelCategory'
            ,values :   ['2 Star','3 Star','4 Star','5 Star']
            ,column : '2'
        },{
            label : 'Room Count'
            ,type : 'number'
            ,name : 'erp_roomCount'
            ,column : '2'
        },{
            label : 'Room Type'
            ,type : 'select'
            ,name : 'erp_roomType'
            ,values :  ['Deluxe','Super Deluxe','Luxury','Executive','Family Suite','Family Room','Honeymoon Suite','Standard','Others']
            ,column : '2'
        },{
             label : 'Meal Plan'
             ,type : 'select'
             ,name : 'erp_mealPlan'
             ,values :  ['CP','MAP','EP','API']
             ,column : '3'
        },{
           label : 'Room Cost'
           ,type : 'number'
           ,name : 'erp_roomCost'
           ,column : '2'
           ,isEdit : $scope.data.isEdit
        },{
           label : 'Checkin'
           ,type : 'calender'
           ,name : 'erp_checkinDate'
           ,format : GlobalData.getDateFormat()
           ,column : '3'
           ,defaultDate : 0 // 0 for current date -digit for previous date and digit for next date
           ,hidePrevious : true
           ,options : dateOption()
           ,opened : false
        },{
           label : 'Checkout'
           ,type : 'calender'
           ,name : 'erp_checkoutDate'
           ,column : '3'
           ,format : GlobalData.getDateFormat()
           ,defaultDate : 0 // 0 for current date -digit for previous date and digit for next date
           ,hidePrevious : true
           ,options : dateOption()
           ,opened : false
        },{
            label : 'Inclusions'
            ,type : 'textarea'
            ,name : 'erp_inclusions'
            ,column : '4'
        }];
        return {data : hotelRowData};
    }

    function getNights(first,second) {
        var a = moment(first, 'DD/MM/YYYY')
            ,b = moment(second, 'DD/MM/YYYY')
            ,days = b.diff(a, 'days');
        return days;
    }
    function createModel(data){
        var len = data.length
            model = new Array();
        for(var i=0;i<len;i++){
            var _data = data[i].data
                ,_len = _data.length
                ,temp = {};
            for(var j=0;j<_len;j++){
                if(_data[j].hasOwnProperty('model')){
                    if(_data[j].type === 'calender'){
                        temp[_data[j].name] = moment(_data[j].model).format('DD/MM/YYYY')
                    } else {
                        temp[_data[j].name] = _data[j].model;
                    }
                }
            }
            if(temp.hasOwnProperty('erp_checkinDate') && temp.hasOwnProperty('erp_checkoutDate')){
               temp.erp_nightsOfStay = getNights(temp.erp_checkinDate,temp.erp_checkoutDate);
            };
            model.push(temp);
        }
        return model;
    }
    function setModel(data){
       if(data!=undefined)
        var len = data.length;
        for(var i=0;i<len;i++){
            if(i) $scope.HotelData.push(getHotelRow());
            var _model = $scope.HotelData[i].data
                ,_len = _model.length;
            for(var j=0;j<_len;j++){
                for(key in data[i]){
                    if(key === _model[j].name){
                        if(_model[j].type === 'calender'){
                            var tempDate = data[i][key].split('/');
                            var date = tempDate[1]+'/'+tempDate[0]+'/'+tempDate[2];
                            _model[j].model = new Date(date);
                        } else {
                            _model[j].model = data[i][key];
                        }
                    }
                }
            }
        }
    }
    $scope.isShow = function(item){
        if(item.hasOwnProperty('isEdit')){
            return $scope.data.isEdit;
        }
        return true;
    }
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        startingDay: 1,
        showWeeks : false
    };
    $scope.popup = {
        opened: false
    };
    $scope.open = function(item) {
        item.opened = true;
    };
    $scope.dateOptions.minDate = new Date();
    var d = new Date()
      ,date = d.getDate()
      ,month = d.getMonth()
      ,year = d.getFullYear()+($scope.data.defaultDate);
    $scope.data.model = new Date(year,month,date);

    $scope.HotelData = [getHotelRow()];
    $scope.addMore = function(){
        $scope.HotelData.push(getHotelRow());
    }
    $scope.remove = function(index){
        $scope.HotelData.splice(index, 1);
    };

    $scope.$watch('HotelData',function(data){
        if(data == undefined) return;
        $scope.data.model = createModel(data);
    },true);

    $timeout(function(){
        if($scope.data.model){
            setModel($scope.data.setModel);
        }
    });
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
        html += '<div class="add-hotel">' +
                    '<div class="pos-r clearfix p5" ng-repeat="hotel in HotelData" ng-class="{\'odd\':$odd}">' +
                        '<div class="col-sm-11 row">' +
                            '<div ng-repeat="item in hotel.data" ng-if="isShow(item)" class="form-group col-sm-{{item.column}}">' +
                                '<label >{{item.label}}</label>' +
                                '<input ng-if="item.type == \'text\'" class="form-control" ng-model="item.model" type="text" />' +
                                '<input ng-if="item.type == \'number\'" class="form-control" ng-model="item.model" type="number" />' +
                                '<select ng-if="item.type == \'select\'" class="form-control" ng-model="item.model">' +
                                    '<option ng-repeat="opt in item.values">{{opt}}</option>' +
                                '</select>' +
                                '<textarea ng-if="item.type == \'textarea\'" class="form-control" ng-model="item.model" ></textarea>' +
                                '<p ng-if="item.type == \'calender\'" class="input-group">' +
                                    '<input type="text" class="form-control" uib-datepicker-popup="{{item.format}}" ng-model="item.model" is-open="item.opened" show-button-bar="false" datepicker-options="item.options"/>' +
                                    '<span class="input-group-btn">' +
                                      '<button style="padding: 2px 5px 1px" type="button" class="btn btn-default" ng-click="open(item)"><i class="fa fa-calendar"></i></button>' +
                                    '</span>' +
                                  '</p>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-sm-1 add-hotel-btn form-group">' +
                            '<button ng-if="!$last" class="btn btn-danger" ng-click="remove($index)"><i class="fa fa-minus"></i></button>' +
                            '<button ng-if="$last" class="btn btn-success" ng-click="addMore()"><i class="fa fa-plus"></i></button>' +
                        '</div>' +
                    '</div>' +
                '</div>';
    return html;
  }
}).directive('numberConverter', function() {
    return {
        priority : 1,
        restrict : 'A',
        require  : 'ngModel',
        link : function(scope, element, attr, ngModel) {
            function toModel(value) {
                return "" + value;
            }
            function toView(value) {
                return parseInt(value); // convert to number
            }
            ngModel.$formatters.push(toView);
            //ngModel.$parsers.push(toModel);
        }
    };
});