angular.module('sbAdminApp').directive('erpHotelDetail',function($compile){
    return{
        restrict : 'A'
        ,scope : {
           data : '=erpHotelDetail'
        }
        ,link : link
        ,controller : controller

    }
    function controller($scope){
        console.log('data',$scope.data);
    }

    function link($scope,element,attr){
      element.html('').append($compile(renderHTML())($scope));
    }

    function renderHTML(){
        var html =  '';
            html += '<div ng-class="{\'borbottm\' : !$last}" ng-repeat = "item in data">'+
                            '<div class="row mt30">'+
                               ' <div class="col-md-6 splook m-t20">'+
                                    '<b>{{item.erp_hotelName}}</b>'+
                                    '<span>     ,Star --- {{item.erp_hotelCategory}}</span>'+
                                    '<p>{{item.erp_roomType}}</p>'+
                                    '<div class="col-md-12" >'+
                                       '<div class="col-md-6 tripcol">'+
                                              '<h5>Checkin</h5> <h3>{{item.erp_checkinDate}}</h3>'+
                                         '</div>'+
                                          '<div class="col-md-6 tripcol">'+
                                              '<h5>Checkout</h5> <h3>{{item.erp_checkoutDate}}</h3>'+
                                           '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="col-md-6">'+
                                   '<textarea  readonly class="m-t20 txtArea forside" rows="6">Inclusions \n {{item.erp_inclusions}} </textarea>'+
                               '</div>'+
                            '</div>'+
                        '</div>'
             return html;
    }

})