'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('erp')
	.directive('header', function () {
		return {
			templateUrl: 'scripts/directives/header/header.html',
			restrict: 'E',
			replace: true,
			controller: controller
		}
		function controller($scope, API, Session, Authenticate) {
			$scope.passwordValidate = function (passwordData) {
				if (!passwordData) return true;
				var old = passwordData.hasOwnProperty('oldpassword') && passwordData.oldpassword != undefined && passwordData.oldpassword != '';
				var _new = passwordData.hasOwnProperty('newpassword') && passwordData.newpassword != undefined && passwordData.newpassword != '';
				var confirm = passwordData.hasOwnProperty('confirmpassword') && passwordData.confirmpassword != undefined && passwordData.confirmpassword != '';
				var isDisabled = old && _new && confirm &&
					passwordData.newpassword == passwordData.confirmpassword;
				return !isDisabled;
			}

			$scope.changePassword = function (data) {
				var employeeId = Session.get('id');
				var temp = new Object();
				temp.oldPassword = data.oldpassword;
				temp.newPassword = data.newpassword;
				API.put('employee/' + employeeId + '/changePassword', temp).then(function (response) {
					console.log(' ===== ', response);
					Authenticate.doLogout();
				});
			}
		}
	});


