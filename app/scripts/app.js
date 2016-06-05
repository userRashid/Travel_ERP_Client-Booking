'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
      'oc.lazyLoad',
      'ui.router',
      'ui.bootstrap',
      'angular-loading-bar',
      'ngTagsInput'
      ,'jkuri.datepicker'
      ,'ngMaterial'
      ,'smart-table'
      ,'ngAnimate'
      ,'ui.bootstrap.datetimepicker'
      ,'daterangepicker'
      //,'ngCookies'
      //,'ngResource'
      //,'toggle-switch'
      //,'chart.js'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/leads/home');

    $stateProvider
    .state('leads',{
        url:'/leads',
        templateUrl: 'views/dashboard/main.html'
    }).state('leads.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html'
    }).state('leads.form',{
        templateUrl:'views/form.html',
        url:'/form'
    }).state('leads.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    }).state('leads.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl'
    }).state('leads.table',{
        templateUrl:'views/table.html',
        url:'/table'
    }).state('leads.add-leads',{
        templateUrl:'views/add-leads/add-leads.html',
        url:'/add-leads',
        controller:'addLead'
    }).state('leads.all',{
        templateUrl:'views/manage-leads/manage-leads.html',
        controller:'ManageLeadsCtrl',
        url:'/manage-leads'
    }).state('leads.manage-leads',{
        templateUrl:'views/leads/leads.html',
        url:'/manage-leads/:id',
        controller : 'LeadsCtrl'
    }).state('leads.customers',{
        templateUrl:'views/customers/customers.html',
        controller: 'CustomersCtrl',
        url:'/customers'
    }).state('booking',{
        templateUrl:'views/dashboard/main.html',
        url:'/booking'
    }).state('booking.detail',{
        templateUrl:'views/bookingDetail/bookingDetail.html',
        controller : 'bookingDetailCtrl',
        url:'/manage-booking/:id'
    }).state('booking.manage-booking',{
        templateUrl:'views/booking/booking.html',
        controller: 'BookingCtrl',
        url:'/manage-booking'
    }).state('leads.x',{
        templateUrl:'views/ui-elements/grid.html',
        url:'/x'
    })
  }]);

    
