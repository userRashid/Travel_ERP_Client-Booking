(function () {

    'use strict';
    angular
        .module('erp_component', [])
        .config(config);

    function config() {
        //
    }
})();
(function () {
    angular
        .module('erp_component')
        .directive('erpAction', erpAction);

    function erpAction($compile, Session) {

        return {
            restrict: 'E'
            , replace: true
            , scope: {
                label: '@'
                , type: '@'
                , name: '@'
                , action: '&'
                , css: '@'
                , link: '@'
            }
            , link: link
            , controller: controller
        }

        function checkPermission(permissionName) {
            var permissions = JSON.parse(Session.get('permission'));
            var isShow = permissions.indexOf(permissionName) != -1;
            return isShow;
        }

        function link($scope, element, attr) {
            console.log(' ---- ', $scope);
            var permission = checkPermission($scope.name);
            element.replaceWith($compile(renderHTML($scope.type, $scope.label, permission))($scope));
        };

        function controller() {

        }

        function renderHTML(type, label, permission) {
            var html = '';
            if (permission && type === 'button') html += '<button class="{{css}}" ng-click="action({data:data})">' + label + '</button>';
            if (permission && type === 'link') html += '<a href="{{link}}" class="{{css}}">' + label + '</a>';
            if (permission && type === 'nav') html += '<a class="{{css}}" ui-sref="{{link}}">' + label + '</a>';
            return html;
        }
    }
})();
'use strict';
angular.module('erp_component').directive('erpAddMore', function ($compile, ErpNodeServices, API, Notify, Session, FormData) {
  return {
    restrict: 'A'
    , scope: {
      options: '=erpAddMore'
    }
    , link: link
    , controller: controller
  }
  function link($scope, element, attr) {
    element.html('').append($compile(renderHTML())($scope));
  };

  function controller($scope) {
    if ($scope.options.model == undefined) $scope.model = 0;
    else $scope.model = $scope.options.model;
    $scope.$watch('model', function (d) {
      if (d == undefined) return;
      $scope.options.model = d;
      if ($scope.options.watch != undefined) $scope.options.watch.setRooms(d);
    });
    $scope.add = function () {
      $scope.model++;
    }
    $scope.remove = function () {
      $scope.model--;
    }
  }
  function renderHTML() {
    var html = '';
    html = '<div class="addMore">' +
      '<button ng-click="remove()" ng-disabled="model == 0" class="fa fa-minus btn-info"></button>' +
      '<input class="form-control" type="input" ng-model="model" />' +
      '<button ng-click="add()" class="fa fa-plus btn-success"></button>' +
      '</div>';
    return html;
  }
});













'use strict';
angular.module('erp_component').directive('erpAlert', function ($compile, ErpNodeServices, API, Notify, Session, FormData) {
  return {
    restrict: 'A'
    , scope: {
      options: '=erpAlert'
    }
    , link: link
    , controller: controller
  }
  function link($scope, element, attr) {
    element.html('').append($compile(renderHTML())($scope));
  };

  function controller($scope) {
    $scope.data = ErpNodeServices.createForm(FormData.erpAlert());
    $scope.options.promise = $scope.data.promise;
  }
  function renderHTML() {
    var html = '';
    html = '<div>' +
      '<div class="clearfix" style="margin-top:10px;" data-form-builder="options.promise"></div>' +
      '</div>';
    return html;
  }
});













(function () {
    'use strict';
    angular.module('erp_component')
        .directive('erpAssign', ErpAssign);
    function ErpAssign($compile) {

        function _link($scope, element, attr) {
            element.html('').append($compile(_renderHTML())($scope));
        }

        function _controller($scope, $timeout) {
            /////////////////////////////////////////////
            // Locals
            /////////////////////////////////////////////

            function _gatSelected(items) {
                var selectedData = items.filter(function (item) {
                    return item.isSelected === true;
                });
                return selectedData;
            }

            function _appendSelected(entities) {
                var newEntities = [];
                angular.forEach(entities, function (entity) {
                    var appended = entity;
                    appended.isSelected = false;
                    newEntities.push(appended);
                });
                return newEntities;
            }

            function _filterOut(original, toFilter) {
                var filtered = [];
                angular.forEach(original, function (entity) {
                    var match = false;
                    for (var i = 0; i < toFilter.length; i++) {
                        if (toFilter[i].label === entity.label) {
                            match = true;
                            break;
                        }
                    }
                    if (!match) {
                        filtered.push(entity);
                    }
                });
                return filtered;
            }


            /////////////////////////////////////////////

            var selected = {
                available: [],
                current: []
            };

            $scope.options.available.then(function (_data) {
                $scope.available = _data;
            });

            $scope.options.assign.then(function (_data) {
                $scope.model = _data;
            });

            $scope.removeValues = function () {
                var removeValues = _gatSelected($scope.model);
                $scope.available = _appendSelected($scope.available.concat(removeValues));
                $scope.model = _appendSelected(_filterOut($scope.model, $scope.available));
                $scope.createModel();
            }

            $scope.assignValues = function () {
                var selectedValues = _gatSelected($scope.available);
                $scope.model = _appendSelected($scope.model.concat(selectedValues));
                $scope.available = _appendSelected(_filterOut($scope.available, $scope.model));
                $scope.createModel();
            }

            $scope.makeButtonDisabled = function (data) {
                var found = new Array();
                if (data === undefined) return true;
                data.forEach(function (item) {
                    if (item.isSelected) {
                        found.push(item);
                    }
                });
                return found;
            };

            $scope.createModel = function () {
                var _model = new Array();
                $scope.model.forEach(function (item) {
                    _model.push(item.id);
                })
                $scope.options.model = _model;
            }

            //Set Up createModel

            function _setModel(model) {
                $scope.available.map(function (avItem) {
                    model.forEach(function (item) {
                        if (avItem.id === item) {
                            avItem.isSelected = true;
                        }
                    });
                    return avItem;
                });
            }

            $timeout(function () {
                if ($scope.options.model) {
                    _setModel($scope.options.model);
                    $scope.assignValues();
                }
            })
        }

        return {
            restrict: 'A'
            , scope: {
                options: '=erpAssign'
            }
            , link: _link
            , controller: _controller
        }

        function _renderHTML() {
            var html = '';
            html = '<div class="clearfix">' +
                '<div class="assign">' +
                '<b>Available ({{available.length}})</b>' +
                '<ul>' +
                '<li ng-repeat="item in available" class="checkbox">' +
                '<label><input type="checkbox" ng-model="item.isSelected" value="">&nbsp;{{item.label}}</label>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '<div class="assign-button">' +
                '<button class="btn btn-danger" ng-click="assignValues()" ng-disabled="!makeButtonDisabled(available).length"><i class="fa fa-chevron-right"></i></button>' +
                '<br />' +
                '<button class="btn btn-danger" ng-click="removeValues()" ng-disabled="!makeButtonDisabled(model).length"><i class="fa fa-chevron-left"></i></button>' +
                '</div>' +
                '<div class="assign">' +
                '<b>Assign ({{model.length}})</b>' +
                '<ul class="list-group">' +
                '<li ng-repeat="item in model">' +
                '<label><input type="checkbox" ng-model="item.isSelected" value="">&nbsp;{{item.label}}</label>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</div>';
            return html;
        }
    }
})();
'use strict';
angular.module('erp_component').directive('erpAttach',function($compile,ErpNodeServices,API,Notify,Session,FormData){
  return {
    restrict : 'A'
    ,scope : {
      options : '=erpAttach'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  };

  function controller($scope){
    $scope.data = ErpNodeServices.createForm(FormData.addAttach());
    $scope.options.promise = $scope.data.promise;
  }
  function renderHTML(){
    var html = '';
    html = '<div>' +
                '<div class="clearfix" style="margin-top:10px;" data-form-builder="options.promise"></div>' +
            '</div>';
    return html;
  }
});













angular.module('erp_component').directive('erpCalender',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpCalender'
    }
    ,link : link
    ,controller : controller
  }

  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }

  function controller($scope,GlobalData){
    //$scope.dt = new Date();
    $scope.format = GlobalData.getDateFormat();
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        startingDay: 1,
        showWeeks : false
    };
    if($scope.data.hidePrevious){
      $scope.dateOptions.minDate = new Date()
    } else {
      $scope.dateOptions.minDate = new Date(1950, 5, 22)
    }
    if($scope.data.model == undefined){
      var d = new Date()
          ,date = d.getDate()
          ,month = d.getMonth()
          ,year = d.getFullYear()+($scope.data.defaultDate);
      $scope.data.model = new Date(year,month,date);
    }
    $scope.popup = {
        opened: false
    };
    $scope.open = function() {
        $scope.popup.opened = true;
    };
  }
  function renderHTML(){
    var html = '';
      html +='<p class="input-group">' +
                '<input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="data.model" is-open="popup.opened" show-button-bar="false" datepicker-options="dateOptions" ng-required="true" />' +
                '<span class="input-group-btn">' +
                  '<button type="button" class="btn btn-default" ng-click="open()"><i class="fa fa-calendar"></i></button>' +
                '</span>' +
              '</p>';
    return html;
  }
});

angular.module('erp_component').directive('erpBookingStatus',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpBookingStatus'
    }
    ,link : link
    ,controller : controller
  }

  /////////////////////////////////////////////////////////
  //Locals
  function setModel(name,data){
    var len = data.length;
    for(var i=0;i<len;i++){
      if(data[i].value == name) return data[i];
    }
  };

  function makeModel(data){
    var obj = {};
    if(data.hasOwnProperty('erp_bookingStatus') && data.erp_bookingStatus != ''){
        obj.erp_bookingStatus = data.erp_bookingStatus;
    } else {
        obj.erp_bookingStatus = '';
    }

    if(data.hasOwnProperty('erp_tokenAmount') && data.erp_tokenAmount != ''){
        obj.erp_tokenAmount = data.erp_tokenAmount;
    } else {
        obj.erp_tokenAmount = '';
    }
    return obj;
  }

  ///////////////////////////////////////////////////


  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function controller($scope){
    $scope.Data = [];
    $scope.Model = {};
    $scope.data.nullValue = $scope.data.nullValue || '-- Make Selection --';
    if(angular.isArray($scope.data.values)) {
      $scope.Data = $scope.data.values;
    } else {
      $scope.$watch('data.values',function(value){
        value.then(function (possibleValues) {
          $scope.Data = possibleValues;
        });
      });
    }
    $scope.isBookingAmount = false;
    if($scope.data.erpBookingStatus)$scope.Model.erp_bookingStatus = $scope.data.erpBookingStatus;
    if($scope.data.erpTokenAmount)$scope.Model.erp_tokenAmount = $scope.data.erpTokenAmount;
    $scope.$watch('Model',function(model){
        if(model == undefined) return;
        if(model.erp_bookingStatus == 'Token Amount Received'){
            $scope.isBookingAmount = true;
        } else {
            $scope.isBookingAmount = false;
        }
        $scope.data.model = makeModel(model);
    },true);
  }
  function renderHTML(){
    var html = '';
        html +='<div class="form-group">' +
                '<label>Status</label>' +
                    '<select class="form-control" ng-options="item for item in Data" ng-model="Model.erp_bookingStatus">' +
                        '<option value="">{{data.nullValue}}</option>' +
                    '</select>' +
                '</div>' +
                '<div ng-if="isBookingAmount" class="form-group">' +
                    '<label>{{Model.erp_bookingStatus}}</label>' +
                    '<input class="form-control" type="number" ng-model="Model.erp_tokenAmount" />' +
                '</div>';
        return html;
  }
});

angular.module('erp_component').directive('erpCheckbox',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpCheckbox'
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope){
    $scope.data.values.then(function(_d){
      $scope.Data = _d;
    });
    $scope.$watch('Data',function(_d){
      if(_d == undefined) return;
      var len = _d.length
        ,temp = new Array();
        $scope.data.model = "";
      for(var i=0;i<len;i++){
        if(_d[i].model){
          temp.push(_d[i].value);
        }
      }
      if(temp.length >0) $scope.data.model = temp;
    },true);
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
    html +='<div class="clearfix">';
      html +='<div class="col-lg-4" ng-repeat="item in Data">';
        html +='<label class="checkbox"><div class="checker">';
        html +='<span><input type="checkbox" ng-model="item.model" ng-checked ="data.model"  class="checkbox" value="{{item.value}}"></span></div>';
        html += '{{item.label}}';
        html +='</label>';
      html +='</div>';
    html +='</div>';
    return html;
  }
});

angular.module('erp_component').directive('erpDateRange',function($compile,$filter){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpDateRange'
      ,startModel : '='
      ,endModel : '='
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope,GlobalData){
    $scope.format = GlobalData.getDateFormat();
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        startingDay: 1,
        showWeeks : false
    };
    $scope.popupFirst = {
        opened: false
    };
    $scope.openFirst = function() {
        $scope.popupFirst.opened = true;
    };
    $scope.popupTwo = {
        opened: false
    };
    $scope.openTwo = function() {
        $scope.popupTwo.opened = true;
    };

     if($scope.startModel || $scope.endModel ){
        $scope.data ={
            start : {label : 'Checkin' ,  model : moment($scope.startModel, 'DD/MM/YYYY')._d},
            end   : {label : 'Checkout' , model : moment($scope.endModel, 'DD/MM/YYYY')._d }
        }
     }

    $scope.$watch('data',function(values){
        if(!values) return
        if(values.start.model)$scope.startModel = $filter('date')(values.start.model, $scope.format);
        if(values.end.model)$scope.endModel = $filter('date')(values.end.model, $scope.format);;

    },true);
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
    html +='<div style="float:left" class="row">';
      html +='<div class="col-lg-6">' +
             '<label ng-if="data.start.label">{{data.start.label}}</label>' ;
        html +='<p class="input-group">' +
                   '<input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="data.start.model" is-open="popupFirst.opened" show-button-bar="false" datepicker-options="dateOptions" ng-required="true" />' +
                   '<span class="input-group-btn">' +
                     '<button type="button" class="btn btn-default" ng-click="openFirst()" style="padding:2px 4px 1px"><i class="fa fa-calendar"></i></button>' +
                   '</span>' +
                 '</p>';
      html +='</div>';
      html +='<div class="col-lg-6">' +
             '<label ng-if="data.end.label">{{data.end.label}}</label>' ;
      html +='<p class="input-group">' +
                 '<input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="data.end.model" is-open="popupTwo.opened" show-button-bar="false" datepicker-options="dateOptions" ng-required="true" />' +
                 '<span class="input-group-btn">' +
                   '<button type="button" class="btn btn-default" ng-click="openTwo()"  style="padding:2px 4px 1px"><i class="fa fa-calendar"></i></button>' +
                 '</span>' +
               '</p>';
    html +='</div>';
     html +='</div>';
    return html;
  }
});

angular.module('erp_component').directive('erpDateRangePicker',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpDateRangePicker'
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope){
   }

  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
    html +='<div><input date-range-picker class="form-control date-picker" type="text"   ng-model="data.date" options="data.opts" required /></div>';
    return html;
  }
});


angular.module('erp_component').directive('erpDateTime',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpDateTime'
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope,GlobalData,$filter){
    var format = GlobalData.getDateTimeFormat();
    $scope.dateId       = "#dropdown2";
    if($scope.data.model == undefined){
        $scope.data.model = $filter('date')(new Date(), format);
    }
    $scope.$watch('data.dateTime',function(data){
        $scope.data.model = $filter('date')(data, format);
    },true)

    $scope.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
        var activeDate = moment(new Date()).subtract(1, $view).add(1, 'minute');
            for (var i = 0; i < $dates.length; i++) {
            if ($dates[i].localDateValue() <= activeDate.valueOf()) {
              $dates[i].selectable = false;
            }
        }
    }
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
   html +='<div class="dropdown">'+
              '<a id="dropdown2" role="button" data-toggle="dropdown" data-target="#" >'+
                '<div class="input-group"><input type="text" class="form-control" data-ng-model=data.model><span class="input-group-addon"><i class="fa fa-calendar"></i></span>'+
                '</div>'+
              '</a>'+
              '<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">'+
                '<datetimepicker  data-before-render="beforeRender($view, $dates, $leftDate, $upDate, $rightDate)" ng-model="data.dateTime" data-datetimepicker-config="{dropdownSelector: dateId , minuteStep : data.minuteStep ,parseFormat :format}"/>'+
              '</ul>'+
        '</div>';
    return html;
  }
});

angular.module('erp_component').directive('erpEmail',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpEmail'
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope){

  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
        html +='<md-input-container class="md-block"><label>{{data.innerLabel}}</label><input ng-model="data.model" ng-disabled="data.isDisable" type="email" ></md-input-container>';
    return html;
  }
});

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
angular.module('erp_component').directive('erpHotelDetail', function ($compile) {
    return {
        restrict: 'A'
        , scope: {
            data: '=erpHotelDetail'
        }
        , link: link
        , controller: controller
    }
    function controller($scope) {
    }

    function link($scope, element, attr) {
        element.html('').append($compile(renderHTML())($scope));
    }

    function renderHTML() {
        var html = '';
        html += '<div ng-class="{\'borbottm\' : !$last}" ng-repeat = "item in data">' +
            '<div>' +
            '<h4><i class="fa fa-building"></i> {{item.erp_hotelName}}</h4>' +
            '<div class="row m-y-1">' +
            '<div class="col-md-4">' +
            '<div class="row"><b class="col-md-8"><i class="fa fa-bed"></i> {{item.erp_roomType}}</b> <span class="col-md-4">{{item.erp_hotelCategory}}</span></div>' +
            '</div>' +
            '<div class="col-md-4">' +
            '<b class="col-md-5"><i class="fa fa-calendar"></i> Check in</b> <span class="col-md-7">{{item.erp_checkinDate}}</span>' +
            '</div>' +
            '<div class="col-md-4">' +
            '<b class="col-md-5"><i class="fa fa-calendar"></i> Check out</b> <span class="col-md-7">{{item.erp_checkoutDate}}</span>' +
            '</div>' +
            '</div>' +
            '<textarea  readonly class="form-control" rows="4">Inclusions \n {{item.erp_inclusions}} </textarea>' +
            '</div>';
        return html;
    }

})
angular.module('erp_component').directive('erpMultiSelect',function($compile,$q){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpMultiSelect'
    }
    ,link : link
    ,controller : controller
  }

  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }

  function controller($scope){
    $scope.getDropDown = function(query) {
      var _d = $q.defer();
      $scope.data.dropDown.then(function(allItems) {
        var filteredItems = _.chain(allItems)
          .filter(function(x) { return x.toLowerCase().indexOf(query.toLowerCase()) > -1; })
          .take(10)
          .value();
        _d.resolve(filteredItems);
      });
      return _d.promise;
    };
  }
  function renderHTML(){
    var html = '';
      html +='<tags-input class="tags-input-override-not" ng-model="data.model" allow-leftover-text="false" placeholder="{{data.label}}" add-on-blur="false" add-on-enter="true" replace-spaces-with-dashes="false">';
        html +='<auto-complete source="getDropDown($query)"min-length="0" debounce-delay="0" load-on-focus="true"></auto-complete>';
      html +='</tags-input>';
    return html;
  }
});

'use strict';
angular.module('erp_component').directive('erpNote',function($compile,ErpNodeServices,API,Notify,Session,FormData){
  return {
    restrict : 'A'
    ,scope : {
      options : '=erpNote'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  };

  function controller($scope){
   /* $scope.data = ErpNodeServices.createForm(FormData.addNote());
    $scope.options.promise = $scope.data.promise;*/
  }
  function renderHTML(){
    var html = '';
    html = '<div>' +
                '<div class="clearfix" style="margin-top:10px;" data-form-builder="options.promise"></div>' +
            '</div>';
    return html;
  }
});













angular.module('erp_component').directive('erpPeople',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpPeople'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));

  }
  function controller($scope){
        $scope.model = {};
        $scope.model.adults = {};
        $scope.model.kids = {};
        if($scope.data.adults != undefined) $scope.model.adults.model = $scope.data.adults;
        if($scope.data.kids != undefined) $scope.model.kids.model = $scope.data.kids;
        $scope.$watch('model',function(_data){
            if(_data == undefined) return;
            if(_data.kids.model>0) $scope.data.model = {adults:_data.adults.model,kids:_data.kids.model};
            else $scope.data.model = {adults:_data.adults.model};
        },true);
    /*var f = true;

    $scope.$watch('data',function(data){
        if(data == undefined) return;
        if(!f) return;
        var am = 0; if(data.adults != undefined) am = data.adults;
        var cm = 0; if(data.adults != undefined) cm = data.adults;
        console.log(am,cm)
        $scope.model.adults.model = am;
        $scope.model.kids.model   = cm;
        console.log('********************* ',$scope.model,data);
        f = false;
    },true);*/
  }
  function renderHTML(){
    var html = '';
    html +='<div class="clearfix row">';
      html +='<div class="col-lg-6" data-erp-add-more="model.adults"></div>'+
            '<div class="col-lg-6" data-erp-add-more="model.kids"></div>';
    html +='</div>';
    return html;
  }
});

angular.module('erp_component').directive('erpPhone',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpPhone'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function controller($scope){
    $scope.$watch('data',function(data){
        if(!data.validation)return
         $scope.phoneNumberPattern =  data.validation.phoneNumberPattern;
         $scope.maxPhoneLength     =  data.validation.maxPhoneNoLength;
       },true)

  }

  function renderHTML(){
    var html = '';
        html +='<span style="color:red;" ng-show="myerpPhone.myInput.$error.pattern">Phone number must begin with either 7,8 or 9 </span>' +
               '<span style="color:red;" ng-show="myerpPhone.myInput.$error.maxlength">Phone number must of 10 digits</span>' +
                '<div class="input-group" ng-form name="myerpPhone">' +
                  '<span ng-if="data.code" class="input-group-addon">{{data.code}}</span>' +
                  '<input name="myInput" type="text" ng-model="data.model" class="form-control"  ng-pattern="phoneNumberPattern" ng-maxlength="maxPhoneLength" >' +
                '</div>';
    return html;
  }
});

angular.module('erp_component').directive('erpSelect',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpSelect'
    }
    ,link : link
    ,controller : controller
  }

  /////////////////////////////////////////////////////////
  //Locals
  function setModel(name,data){
    var len = data.length;
    for(var i=0;i<len;i++){
      if(data[i].value == name) return data[i];
    }
  };
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function controller($scope){
    $scope.Data = [];
    if($scope.data.isDisable == undefined) $scope.data.isDisable = false;
    $scope.data.nullValue = $scope.data.nullValue || '-- Make Selection --';
    if(angular.isArray($scope.data.values)) {
      $scope.Data = $scope.data.values;
    } else {
      $scope.$watch('data.values',function(value){
        value.then(function (possibleValues) {
          $scope.Data = possibleValues;
        });
      });
    }
  }
  function renderHTML(){
    var html = '';
    html += '<select class="form-control" ng-disabled="data.isDisable" ng-options="item for item in Data" ng-model="data.model">' +
              '<option value="">{{data.nullValue}}</option>' +
            '</select>';
    return html;
  }
});

angular.module('erp_component').directive('erpText',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpText'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function controller($scope){
    if($scope.data.isDisable == undefined) $scope.data.isDisable = false;
    if($scope.data.watch == undefined) $scope.data.isShow = true;
  }
  function renderHTML(){
    var html = '';
    html +='<input type="text" ng-if="data.isShow" ng-model="data.model" ng-disabled="data.isDisable" class="form-control">';
    return html;
  }
});

(function () {

    'use strict';

    angular
        .module('erp_component')
        .directive('erpTimeline', erpTimeline);
    function erpTimeline() {
        return {
            templateUrl: 'component/erpTimeline/erpTimeline.html',
            restrict: 'A',
            scope: {
                options: "=erpTimeline"
            },
            replace: true
            //,link : link
            , controller: controller
        }
        function controller($scope, $timeout, Authenticate, API, Notify) {
            function timeDifference(current, previous) {
                var msPerMinute = 60 * 1000;
                var msPerHour = msPerMinute * 60;
                var msPerDay = msPerHour * 24;
                var msPerMonth = msPerDay * 30;
                var msPerYear = msPerDay * 365;
                var elapsed = current - previous;
                if (elapsed < msPerMinute) return Math.round(elapsed / 1000) + ' seconds ago';
                else if (elapsed < msPerHour) return Math.round(elapsed / msPerMinute) + ' minutes ago';
                else if (elapsed < msPerDay) return Math.round(elapsed / msPerHour) + ' hours ago';
                else if (elapsed < msPerMonth) return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
                else if (elapsed < msPerYear) return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
                else return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
            }
            function _getDate(t) {
                var d = new Date(Number(t));
                return d;
            }
            function insertionSort(files, attrToSortBy) {
                for (var k = 1; k < files.length; k++) {
                    files[k].erp_source = files[k].erp_source.toLowerCase();
                    for (var i = k; i > 0 && _getDate(files[i][attrToSortBy]) < _getDate(files[i - 1][attrToSortBy]); i--) {
                        var tmpFile = files[i];
                        files[i] = files[i - 1];
                        files[i - 1] = tmpFile;
                    }
                }
                return files;
            }
            $scope.timeAgo = function (updatedTime) {
                var currentTime = new Date(Date.now()),
                    updateTime = new Date(updatedTime),
                    _time = timeDifference(currentTime, updateTime);
                return _time;
            }
            $scope.showTime = function (updatedTime) {
                var updateTime = moment(updatedTime).format("DD/MM/YYYY h:mm:ss A")
                return updateTime;
            }
            $scope.getStyle = function (type) {
                var css = '';
                if (type != undefined) type = type.toLowerCase();
                switch (type) {
                    case "email": css = 'fa-envelope-o'; break;
                    case "phone": css = 'fa-phone'; break;
                    case "note": css = 'fa-file-o'; break;
                    case "attachment": css = 'fa-paperclip'; break;
                    case "alert": css = 'fa-bell'; break;
                    default: css = ''; break;
                }
                return css;
            }

            $scope.getStyleBG = function (type) {
                var css = '';
                if (type != undefined) type = type.toLowerCase();
                switch (type) {
                    case "email": css = ''; break;
                    case "phone": css = 'warning'; break;
                    case "note": css = 'danger'; break;
                    case "attachment": css = 'info'; break;
                    case "alert": css = 'success'; break;
                    default: css = ''; break;
                }
                return css;
            }
            $scope.editTimeLine = function (item) {
                item.showItem = true;
                $timeout(function () {
                    item.Note.promise.then(function (d) {
                        if (item.erp_source == 'alert') {
                            d.setModel({ erp_description: item.erp_alertNotes, erp_datetime: item.erp_alertDate });
                        } else {
                            d.setModel({ erp_notes: item.erp_notes });
                        }
                    });
                });

            };
            $scope.cancelEdit = function (item) {
                item.showItem = false;
            }
            function addNoteObj(data) {
                data.Note = {};
                return data;
            }
            $scope.options.promise.then(function (response) {
                var timeline = insertionSort(response.data.erp_leadAttachments.concat(response.data.erp_notes, response.data.erp_alerts), 'erp_updateTimestamp').reverse()
                    , len = timeline.length
                    , temp = new Array();
                for (var i = 0; i < len; i++) {
                    temp.push(addNoteObj(timeline[i]));
                }
                $scope.timeline = temp;
            });

            $scope.updateNode = function (item) {
                item.Note.promise.then(function (d) {
                    var model = d.getModel();
                    model.erp_source = item.erp_source;
                    model.erp_createdBy = Authenticate.user().id;
                    console.log('Update Called', item, model);
                    API.put('lead/' + item.erp_leadId + '/note/' + item.erp_noteId, model).then(function (response) {
                        Notify.add('success', 'Success', 'Update ' + item.erp_source);
                        item.erp_notes = model.erp_notes;
                        item.showItem = false;
                    });
                });
            }

            $scope.updateAlert = function (item) {
                item.Note.promise.then(function (d) {
                    var model = d.getModel();
                    model.erp_source = item.erp_source;
                    //TODO need to change ids in formData
                    model.erp_alertNotes = model.erp_description;
                    model.erp_alertDate = model.erp_datetime;
                    model.erp_alertStatus = 'ACTIVE';
                    model.erp_emailNotification = false;
                    API.put('lead/' + item.erp_leadId + '/alert/' + item.erp_alertId, model).then(function (response) {
                        Notify.add('success', 'Success', 'Update ' + item.erp_source);
                        item.erp_alertNotes = model.erp_description;
                        item.showItem = false;
                    });
                });
            }

            $scope.options.addNew = function (data) {
                $scope.timeline.unshift(addNoteObj(data));
            }

            $scope.getAttachment = function (item) {
                //console.log(' *****  ',item);
            }
        }
        function link() {

        }
    };
})()


angular.module('erp_component').directive('erpTextarea',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpTextarea'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function controller($scope){
        var _modelData ="";
        $scope.$watch('data.checkboxModel',function(data){
            if(!data) return;
            if(data == true){
                _modelData =  $scope.data.model;
                $scope.data.model= $scope.data.checkboxData.concat(_modelData);
            }else if(data == false){
                _modelData =  $scope.data.model;
                $scope.data.model= _modelData.replace($scope.data.checkboxData,"");
            }
        });
  }
  function renderHTML(){
    var html = '';
    html
    html +='<span ng-if="data.isCheckbox"><input type="checkbox"  ng-model="data.checkboxModel">&nbsp;{{data.checkboxLabel}}</span>{{}}'+
           '<textarea rows="4"  ng-model="data.model" class="form-control" placeholder="{{data.placeholder}}" value ="data.checkboxData"></textarea>'
    return html;
  }
});
angular.module('erp_component').directive('erpTravelBookings',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=erpTravelBookings'
    }
    ,link : link
    ,controller : controller
  }

  function controller($scope){
    var travelData = [{}];
    $scope.addMore = function(){
        $scope.travelData.push({});
    }
    $scope.remove = function(index){
        $scope.travelData.splice(index, 1);
    };
    $scope.travelData = travelData;
    if(!$scope.data.model){
        $scope.data.model = $scope.travelData;
    }else{
        $scope.travelData =  $scope.data.model;
    }
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  }
  function renderHTML(){
    var html = '';
        html += '<div class="add-hotel">' +
                    '<div class="pos-r clearfix" ng-repeat="item in travelData">' +
                        '<div class="col-sm-11 row">' +
                            '<div class="form-group col-sm-6"><label>Travel Mode</label><input placeholder="Train/Flight" class="form-control" ng-model="item.erp_travelType" type="text" /></div>' +
                            '<div class="form-group col-sm-4"><label>Total Cost</label><input class="form-control" type="number" number-converter ng-model="item.erp_travelCost"/></div>' +
                        '</div>' +
                        '<div class="col-sm-1 add-hotel-btn">' +
                            '<button ng-if="!$last" class="btn btn-danger" ng-click="remove($index)"><i class="fa fa-minus"></i></button>' +
                            '<button ng-if="$last" class="btn btn-success" ng-click="addMore()"><i class="fa fa-plus"></i></button>' +
                        '</div>' +
                    '</div>' +
                '</div>';
    return html;
  }
});

'use strict';
angular.module('erp_component').directive('erpUpload',function($compile,ErpNodeServices,API,Notify,Session,FormData){
  return {
    restrict : 'A'
    ,scope : {
      options : '=erpUpload'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  };

  function controller($scope){
    $scope.options.promise = ErpNodeServices.createForm(FormData.addAttach());
  }
  function renderHTML(){
    var html = '';
    html = '<input type="file" file-model="options.model"/>';
    return html;
  }
});

angular.module('erp_component').directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;

                  element.bind('change', function(){
                    console.log('element[0] -- ',element[0].files);
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);
'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('erp_component').directive('formBuilder',function($compile){
  return {
    restrict : 'A'
    ,scope : {
      data : '=formBuilder'
      ,mode : '@'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    element.html('').append($compile(renderHTML())($scope));
  };

  function controller($scope){
    $scope.$watch('data',function(promise){
      promise.then(function(obj){
        $scope.options = obj.data;
      });
    });
    if($scope.mode == undefined){
      $scope.mode = 'full';
    }
    $scope.getClass = function(item){
        if(item.mode != undefined) return 'col-lg-12';
      var c = '';
      if($scope.mode == 'full')     c = 'col-lg-12';
      if($scope.mode == 'inline')   c = 'col-lg-4';
      if($scope.mode == 'half')     c = 'col-lg-6';
      return c;
    }
  }
  function renderHTML(){
    var html = '';
      html +='<form name="cardForm" class="clearfix">';
        html +='<div ng-class="getClass(item)" ng-repeat="item in options" ng-class="{\'selected\':$odd}" class="form-group" ng-switch on="item.type">';
            html +='<label ng-if="item.label">{{item.label}}</label>';
            html +='<div      ng-switch-when="erpText"      data-erp-text="item" ></div>';
            html +='<input    ng-switch-when="erpNumber"    ng-model="item.model" class="form-control">';
            html +='<div      ng-switch-when="erpEmail"     data-erp-email="item"></div>';
            html +='<div      ng-switch-when="erpPhone"     data-erp-phone="item"></div>';
            html +='<input    ng-switch-when="erpPassword"  ng-model="item.model" class="form-control" type="password">';
            html +='<div      ng-switch-when="erpTextarea"  data-erp-textarea="item"></div>';
            html +='<div      ng-switch-when="erpSelect"    data-erp-select="item"></div>';
            html +='<div      ng-switch-when="erpUpload"    data-erp-upload="item"></div>';
            html +='<div      ng-switch-when="erpPeople"    data-erp-people="item"></div>';
            html +='<div      ng-switch-when="erpCheckbox"  data-erp-checkbox="item"></div>';
            html +='<div      ng-switch-when="erpAddMore"   data-erp-add-more="item"></div>';
            html +='<div      ng-switch-when="erpCalender"  data-erp-calender="item"></div>';
            html +='<div      ng-switch-when="erpDateTime"  data-erp-date-time="item"></div>';
            html +='<div      ng-switch-when="erpMultiSelect"       data-erp-multi-select="item"></div>';
            html +='<div      ng-switch-when="erpHotel"             data-erp-hotel="item"></div>';
            html +='<div      ng-switch-when="erpBookingStatus"     data-erp-booking-status="item"></div>';
            html +='<div      ng-switch-when="erpTravelBookings"    data-erp-travel-bookings="item"></div>';
            html +='<div      ng-switch-when="erpAssign"    data-erp-assign="item"></div>';
            html +='<div      ng-switch-when="erpTextEditor" text-angular="text-angular" ng-model="item.model" ta-disabled="false"></div>';
            html +='<div      ng-switch-default style="border: 1px solid #c9302c;">{{item.type}}</div>';
            html +='<div class="separator"></div>';
        html +='</div>';
      html +='</form>';
    return html;
  }

});

'use strict';
angular.module('erp_component').directive('lead',function($compile,ErpNodeServices,API,Notify,FormData,Authenticate){
  return {
    restrict : 'A'
    ,scope : {
      options : '=lead'
    }
    ,link : link
    ,controller : controller
  }
  function link($scope,element,attr){
    var _html = $compile(renderHTML())($scope);
    element.html('').append($compile(_html)($scope));
  };

  function controller($scope){
    $scope.info = $scope.options.isShow;
    $scope.isEdit = false;
    var model = '';
    if($scope.options.type === 'lead'){
        $scope.Form = ErpNodeServices.createForm(FormData.addLeadData());
    } else {
        $scope.Form = ErpNodeServices.createForm(FormData.customer());
    }
    $scope.options.data.then(function(response){
        if($scope.options.type === 'lead'){
            model = response.data;
        } else {
            model = response.data.erp_customer;
        }
        $scope.data = response.data;
    });

    $scope.editLead = function(){
        $scope.isEdit = true;
        $scope.Form.promise.then(function(data){
        var _data = data.data,
            _len = _data.length;
        for(var i=0;i<_len;i++){
          if(_data[i].type=="erpEmail") _data[i].isDisable = true;
        }
            data.setModel(model);
        });
    }
    $scope.cancelLead = function(){
        $scope.isEdit = false;
    }
    $scope.showInfo = function(){
        $scope.info = !$scope.info;
    }
    $scope.leadEmail = function(){
        _a();
    }
    $scope.update = function(){
        $scope.Form.promise.then(function(data){
            var _model = data.getModel()
                ,header = {'Content-Type' : 'application/json'};
            if($scope.options.type === 'lead'){
                _model.erp_customerId = $scope.data.erp_customerId;
                API.put('lead/'+model.erp_id,_model,header).then(function(response){
                    $scope.isEdit = false;
                    Notify.add('success','Success','Lead update successfully');
                },function(error){
                    Notify.add('error','Error','Error on updating lead');
                });
            } else {
                _model.erp_dateOfBirth = $scope.data.erp_customer.erp_dateOfBirth;
                _model.erp_createdBy = Authenticate.user().id;
                API.put('customer/'+model.erp_id,_model,header).then(function(response){
                    data.setModel(_model);
                    $scope.isEdit = false;
                    Notify.add('success','Success','Customer information updated successfully');
                },function(error){
                    Notify.add('error','Error','Error on updating customer');
                });
            }
        });
    }
    function _a(){
        alert('I am working on that');
    }
  }
  function renderHTML(){
    var html = '';
    html = '<div>' +
                '<div ng-if="!isEdit" class="card" ng-switch on="options.type">' +
                    '<div class="card-header leads">' +
                        '<div class="row">' +
                            '<div class="col-lg-10 cursor-p" ng-click="showInfo()" >' +
                                '<div ng-switch-when="customer">' +
                                    '<h5 class="m0">{{data.erp_customer.erp_name}}</h5>' +
                                    '<p class="m0">{{data.erp_customer.erp_emailId}}</p>' +
                                '</div>' +
                                '<div ng-switch-when="lead">' +
                                    '<h5 class="m0">{{data.erp_destinations}}</h5>' +
                                    '<p class="m0">{{data.erp_departureDate}}</p>' +
                                '</div>' +
                            '</div>' +
                            '<erp-action name="Edit_Lead" label="<i class=\'fa fa-pencil\'></i>" css="col-lg-1 cursor-p edit-lead" action="editLead()" type="button"></erp-action>'+
                            //'<div class="col-lg-1 cursor-p edit-lead" ng-click="editLead()"><i class="fa fa-pencil"></i></div>' +
                            //'<div ng-switch-when="customer" ng-click="leadEmail()"tooltip="{{data.erp_customer.erp_emailId}}" tooltip-placement="top" class="col-lg-1 cursor-p" title="{{data.erp_customer.erp_emailId}}"><i class="fa fa-envelope"></i></div>' +
                        '</div>' +
                    '</div>' +
                    '<div ng-show="info" class="card-block">' +
                        '<div ng-switch-when="customer">' +
                            '<b>Phone : </b> {{data.erp_customer.erp_phoneNo}}<br />' +
                            '<b>City : </b> {{data.erp_customer.erp_city}}<br />' +
                            '<b>Country : </b> {{data.erp_customer.erp_country}}' +
                        '</div>' +
                        '<div ng-switch-when="lead">' +
                            '<b>Nights : </b> {{data.erp_nights}}<br />' +
                            '<b>People : </b> {{data.erp_adultCount}} - Adult<span ng-if="data.erp_kidsCount >0">&nbsp;,&nbsp;{{data.erp_kidsCount}} - Kids</span><br />' +
                            '<b>Leaving From : </b> {{data.erp_leavingFrom}}<br />' +
                            '<b>Lead Source : </b> {{data.erp_leadSource}}<br />' +
                            '<b>Additional Info : </b> {{data.erp_additionalInfo}}<br />' +
                            '<b>Lead added on : </b> {{data.erp_creationDate}}<br />' +
                            '<b>Assign to : </b> {{data.erp_assignedToEmployee.erp_emp_name}}<br />' +
                        '</div>' +
                    '</div>' +
                '</div>'+
                '<div ng-if="isEdit" class="card clearfix">' +
                    '<div data-form-builder="Form.promise"></div>' +
                    '<div class="text-right col-sm-12 m-b-1">' +
                        '<button class="btn btn-sm btn-success" ng-click="update()">Update</button>&nbsp;&nbsp;' +
                        '<button class="btn btn-sm" ng-click="cancelLead()">Cancel</button>' +
                    '</div>' +
                '</div>'
            '</div>';
    return html;
  }
});













angular.module('erp_component').directive('sideMenu',[function(){
  return {
    link: function(scope, element, attrs){
      // $timeout(function(){
      setTimeout(function(){
        $(element).metisMenu();
      },10);

      scope.$watch(scope.menus, function(){
        setTimeout(function(){
          $(element).metisMenu();
        },10);
      });

      scope.$on('test', function(){
        setTimeout(function(){
          //scope.$apply(function(){
          //$(element).metisMenu();
          //});
          scope.$apply();
        },10);
      });
    }
  }
}])
