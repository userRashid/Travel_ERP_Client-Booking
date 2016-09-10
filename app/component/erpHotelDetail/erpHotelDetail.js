angular.module('sbAdminApp').directive('erpHotelDetail', function ($compile) {
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