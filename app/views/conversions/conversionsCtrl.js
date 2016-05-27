//'use strict';
angular.module('sbAdminApp').controller('ConversionsCtrl', function($scope,Notify,ErpNodeServices){

    $scope.conversionData = [{
        arrival     : '2-dec-16'
       ,duration    : '3N/2D'
       ,room        : '2'
       ,adultCount  : '2'
       ,kidsCount   : '1'
       ,pickupFrom  : 'Delhi'
       ,pickupTo    : 'Shimla'
       ,dropFrom    : 'Shimla'
       ,dropTo      : 'Delhi'
       ,inclusions  : '\n inclusions'
       ,soldCost    : '45000'
       ,cost        :[{ label : 'Margin/Profit' , value : '4500 ' }
                      ,{ label : 'Volvo' , value : '3500 ' }
                      ,{ label : 'Margin' , value : '4500' }
                      ,{ label : 'Shimla Retreat' , value : '4500' }]
       ,totlCost    : '50000'
       ,exclusion   : 'abc'
       ,hotelDetailData : [{ title : 'Shimla Retreat'
                            ,inclusions : 'ancccccccc'
                            ,checkin : { start : {label : 'Checkin' },end   : {label : 'Checkout'}}
                            ,tag    : 'Honeymoon suite with API meal plan'}
                          ,{ title : 'Manali Hill Top'
                            ,inclusions : 'ancccccccc'
                            ,checkin : { start : {label : 'Checkin' },end   : {label : 'Checkout'}}
                            ,tag    : 'Honeymoon suite with API meal plan'
                            }]
    }];
});
