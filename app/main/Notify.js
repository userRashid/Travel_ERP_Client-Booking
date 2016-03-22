'use strict';
angular.module('sbAdminApp').factory('Notify', function() {
  var me = {
    add: add
    ,watch: watch
  };

  return me;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // public
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function add(type, title, body, options) {
	    //var newArray = JSON.parse(Session.get('notify'))
	    //,
	    var message = '';
	    /*if(newArray!= undefined){
            message = { type: type, title: title, body: body, options: options };
            newArray.push(message);
            Session.set('notify', JSON.stringify(newArray));
	    } else {
            message = { type: type, title: title, body: body, options: options };
            // newArray.push(message);
            // Session.set('notify', JSON.stringify(newArray));
        }*/
        message = { type: type, title: title, body: body, options: options };
        show(message);
   
  }

  function watch(promise, title, success, options) {

    promise.then(
      function() {
        add('success', title, success, options)
      },
      function(reason) {
        add('error', title, reason.msg, options);
      }
    )

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // private
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function show(message) {
    //console.log('show message',message)

    switch(message.type) {
      case 'error'  : toastr.error  (message.body,message.title,message.options); break;
      case 'warning': toastr.warning(message.body,message.title,message.options); break;
      case 'success': toastr.success(message.body,message.title,message.options); break;
      case 'info'   : toastr.info   (message.body,message.title,message.options); break;
      default       : toastr.info   (message.body,message.title,message.options); break;
    }

    // toaster.pop(message.type, message.title, message.body);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////





});