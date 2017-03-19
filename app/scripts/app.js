'use strict';
/**
 * @ngdoc overview
 * @description
 *
 * Main module of the application.
 */
angular
    .module('erp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngTagsInput'
        , 'jkuri.datepicker'
        , 'ngMaterial'
        , 'smart-table'
        , 'ngAnimate'
        , 'ui.bootstrap.datetimepicker'
        , 'daterangepicker'
        //,'ngCookies'
        //,'ngResource'
        //,'toggle-switch'
        //,'chart.js'

        , 'erp_navigation'
        , 'erp_leads'
        , 'erp_login'
        , 'erp_booking'
        , 'erp_customer'
        , 'erp_component'
        , 'erp_employee'
        , 'erp_core'
        , 'erp_utility'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


        $urlRouterProvider.otherwise('/leads/home');

        $stateProvider.state('leads', {
            url: '/leads',
            templateUrl: 'views/dashboard/main.html'
        }).state('leads.home', {
            url: '/home',
            controller: 'MainCtrl',
            templateUrl: 'views/dashboard/home.html'
        }).state('leads.form', {
            templateUrl: 'views/form.html',
            url: '/form'
        }).state('leads.blank', {
            templateUrl: 'views/pages/blank.html',
            url: '/blank'
        }).state('leads.chart', {
            templateUrl: 'views/chart.html',
            url: '/chart',
            controller: 'ChartCtrl'
        }).state('leads.table', {
            templateUrl: 'views/table.html',
            url: '/table'
        });


    }]);


(function () {

    'use strict';
    angular
        .module('erp_navigation', [])
        .config(config);

    function config() {
        //
    }
})();

(function () {

    'use strict';
    angular
        .module('erp_core', [])
        .config(config);

    function config() {
        //
    }
})();

(function () {

    'use strict';
    angular
        .module('erp_utility', [])
        .config(config);

    function config() {
        //
    }
})();

