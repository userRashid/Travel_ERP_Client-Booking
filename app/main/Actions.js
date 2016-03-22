angular.module('sbAdminApp').factory('Actions', function() {
  return {
    isLeadShow  :  isLeadShow
  };

  function isLeadShow(id) {
    return sessionStorage.getItem('id') == id;
  }



});