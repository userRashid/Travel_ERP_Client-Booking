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
                            '<div class="row item">'+

                                    '<div class="col-md-12"><h3>{{item.erp_hotelName}}</h3>'+
                                    '</div>'+
                                    '<div class="col-md-4">'+
                                    '<h5 class="col-md-4">{{item.erp_roomType}}</h5> <h4 class="col-md-8">{{item.erp_hotelCategory}}</h4>'+
                                    '</div>'+
                                      '<div class="col-md-4">'+
                                              '<h5 class="col-md-4">Check in</h5> <h4 class="col-md-8">{{item.erp_checkinDate}}</h4>'+
                                         '</div>'+
                                          '<div class="col-md-4">'+
                                              '<h5 class="col-md-4">Check out</h5> <h4 class="col-md-8">{{item.erp_checkoutDate}}</h4>'+
                                           '</div>'+
                                    '</div>'+
                                '<div class="col-md-12">'+
                                   '<textarea  readonly class="form-control" rows="4">Inclusions \n {{item.erp_inclusions}} </textarea>'+
                               '</div>'+
                        '</div>'
             return html;
    }

})