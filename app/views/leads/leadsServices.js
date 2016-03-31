angular.module('sbAdminApp').factory('LeadsServices', function(API,$q,Notify) {
  return {
    getLeadStatus   :   getLeadStatus
    ,saveLead       :   saveLead
  };
  function saveLead(leadId,values){
    var model = {};
    model[values.name] = values.model;
    API.put('lead/'+leadId,model).then(function(data){
       Notify.add('success','Success','Lead Update');
    });
  }
  function getLeadStatus(key) {
    var q = $q.defer();
    API.get('/leadStatusValues').then(function(data){
       q.resolve(data.data);
    });
    return q.promise;
  }
});