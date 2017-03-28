angular.module('erp_core').factory('Authenticate', function (Session) {
  return {
    isLogin: isLogin
    , doLogin: doLogin
    , doLogout: doLogout
    , user: user
    , isAdmin: isAdmin
    , isAuthorised: isAuthorised
  }

  function isLogin() {
    //console.log('Called',Session.get('ticket'));
    return Session.get('ticket') !== null;
  }
  function isAdmin() {
    return superAdminIds.indexOf(user().id) !== -1;
  }

  function isAuthorised(permissionName) {
    var permissions = JSON.parse(Session.get('permission'));
    var isShow = permissions.indexOf(permissionName) != -1;
    return isShow;
  }
  function doLogin(ticket, userId, name) {
    // //console.log('ticket,userId -- ',ticket,userId,name);
    // var p = ['Delete_Lead',
    //   'Export_Leads',
    //   'View_All_Leads',
    //   'Edit_Activity',
    //   'Edit_Lead',
    //   'Assign_Lead',
    //   'View_Assigned_Leads',
    //   'View_Self_Bookings',
    //   'Export_Bookings',
    //   'Edit_Booking',
    //   'View_Costing',
    //   'Edit_Costing',
    //   'View_All_Bookings',
    //   'Create_User',
    //   'Edit_User',
    //   'Delete_User',
    //   'Assign_User',
    //   'Add_Lead',
    //   'Edit_All_Leads',
    //   'Edit_All_Activity'
    // ];
    Session.set('ticket', ticket);
    Session.set('id', userId);
    Session.set('name', name);

  }

  function doLogout() {
    Session.remove('ticket');
    Session.remove('id');
    Session.remove('name');
  }

  function user() {
    var _obj = { 'id': Session.get('id'), name: Session.get('name') };
    return _obj;
  }
});
