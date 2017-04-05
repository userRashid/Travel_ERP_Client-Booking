'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('erp')
	.directive('headerNotification', function (Authenticate, Session) {
		return {
			templateUrl: 'scripts/directives/header/header-notification/header-notification.html',
			restrict: 'E',
			replace: true,
			controller: controller
		}
		function controller($scope, $state) {
			$scope.userName = Session.get('name');
			$scope.logout = function () {
				Authenticate.doLogout();
				$state.go('leads.home');
			}
		}
	});


