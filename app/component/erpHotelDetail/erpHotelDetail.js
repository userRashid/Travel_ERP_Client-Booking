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
                                    '<span>     ,Star -- {{item.erp_hotelCategory}}</span>'+
                                    '<p>{{item.erp_roomType}}</p>'+
                                    '<div class="col-md-12" >'+
                                           '<div data-erp-date-range = "item.erp_checkinDate"></div>'+
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