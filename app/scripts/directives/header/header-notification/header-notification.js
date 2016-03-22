'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('headerNotification',function(Authenticate){
		return {
            templateUrl:'scripts/directives/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
            controller  :    controller
    	}
    	function controller($scope,$state){
    	    $scope.logout = function(){
    	        Authenticate.doLogout();
    	        $state.go('leads.home');
    	    }
    	}
	});


