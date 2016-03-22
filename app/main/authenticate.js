angular.module('sbAdminApp').factory('Authenticate',function(Session){
  return {
    isLogin : isLogin
    ,doLogin  : doLogin
    ,doLogout : doLogout
    ,user : user
  }

  function isLogin(){
    //console.log('Called',Session.get('ticket'));
    return Session.get('ticket') !== null;
  }
  function doLogin(ticket,userId,name){
    //console.log('ticket,userId -- ',ticket,userId,name);
    Session.set('ticket',ticket);
    Session.set('id',userId);
    Session.set('name',name);
  }

  function doLogout(){
    Session.remove('ticket');
    Session.remove('id');
    Session.remove('name');
  }

  function user(){
    var _obj = {'id':Session.get('id'),name:Session.get('name')};
    return _obj;
  }
});
