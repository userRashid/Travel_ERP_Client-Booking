'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('erpTimeline',function() {
    return {
        templateUrl:'component/erpTimeline/erpTimeline.html',
        restrict: 'A',
        scope : {
            options : "=erpTimeline"
        },
        replace: true,
        link : link
        ,controller : controller
    }
    function controller($scope,$timeout,Authenticate,API,Notify){
        function timeDifference(current, previous) {
            var msPerMinute = 60 * 1000;
            var msPerHour = msPerMinute * 60;
            var msPerDay = msPerHour * 24;
            var msPerMonth = msPerDay * 30;
            var msPerYear = msPerDay * 365;
            var elapsed = current - previous;
            if (elapsed < msPerMinute)      return Math.round(elapsed/1000) + ' seconds ago';
            else if (elapsed < msPerHour)   return Math.round(elapsed/msPerMinute) + ' minutes ago';
            else if (elapsed < msPerDay )   return Math.round(elapsed/msPerHour ) + ' hours ago';
            else if (elapsed < msPerMonth)  return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
            else if (elapsed < msPerYear)   return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
            else                            return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
        }
        function _getDate(t){
        	var d = new Date(Number(t));
        	return d;
        }
        function insertionSort(files,attrToSortBy){
        	for(var k=1; k < files.length; k++){
        	    files[k].erp_source = files[k].erp_source.toLowerCase();
        		for(var i=k; i > 0 && _getDate(files[i][attrToSortBy]) <  _getDate(files[i-1][attrToSortBy]); i--){
        			var tmpFile = files[i];
                	files[i] = files[i-1];
                	files[i-1] = tmpFile;
        		}
          	}
          	return files;
        }
        $scope.timeAgo = function(updatedTime){
            var currentTime = new Date(Date.now()),
                updateTime  = new Date(updatedTime),
                _time = timeDifference(currentTime,updateTime);
            return _time;
        }
        $scope.showTime = function(updatedTime){
            var updateTime = moment(updatedTime).format("DD/MM/YYYY h:mm:ss A")
            return updateTime;
        }
        $scope.getStyle = function(type){
            var css = '';
            if(type != undefined) type = type.toLowerCase();
            switch(type){
                case "email"        : css = 'fa-envelope-o';  break;
                case "phone"        : css = 'fa-phone';       break;
                case "meeting"      : css = 'fa-file-o';  break;
                case "attachment"   : css = 'fa-paperclip';   break;
                default             : css = '';  break;
            }
            return css;
        }

        $scope.getStyleBG = function(type){
            var css = '';
            if(type != undefined) type = type.toLowerCase();
            switch(type){
                case "email"        : css = '';  break;
                case "phone"        : css = 'warning';       break;
                case "meeting"      : css = 'danger';  break;
                case "attachment"   : css = 'info';   break;
                default             : css = '';  break;
            }
            return css;
        }
        $scope.editTimeLine = function(item){
            item.showItem = true;
            $timeout(function(){
                item.Note.promise.then(function(d){
                    d.setModel({erp_notes:item.erp_notes});
                });
            });

        };
        $scope.cancelEdit = function(item){
            item.showItem = false;
        }
        function addNoteObj(data){
            data.Note = {};
            return data;
        }
        $scope.options.promise.then(function(response){
            var timeline = insertionSort(response.data.erp_leadAttachments.concat(response.data.erp_notes),'erp_updateTimestamp').reverse()
                ,len = timeline.length
                ,temp = new Array();
            for(var i=0; i<len;i++){
                temp.push(addNoteObj(timeline[i]));
            }
            $scope.timeline = temp;
        });

        $scope.updateNode = function(item){
            item.Note.promise.then(function(d){
                var model = d.getModel();
                model.erp_source    = item.erp_source;
                model.erp_createdBy = Authenticate.user().id;
                console.log('Update Called',item,model);
                API.put('lead/'+item.erp_leadId+'/note/'+item.erp_noteId,model).then(function(response){
                    Notify.add('success','Success','Update '+item.erp_source);
                    item.erp_notes = model.erp_notes;
                    item.showItem = false;
                });
            });
        }

        $scope.options.addNew = function(data){
            $scope.timeline.unshift(addNoteObj(data));
        }

        $scope.getAttachment = function(item){
            //console.log(' *****  ',item);
        }
    }
    function link(){

    }
  });
