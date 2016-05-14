angular.module('sbAdminApp').factory('LeadsServices', function(API,$q,Notify) {
  return {
    getLeadStatus   :   getLeadStatus
    ,saveLead       :   saveLead
    ,addAttachment  :   addAttachment
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

   function addAttachment(leadId,promise,noteType,id){
        var q = $q.defer();
        promise.then(function(data){
            var _data = {},
            attachData = [],
            model = data.getModel(),
            file = model.erp_attachment;

            _data.erp_attId             = 0;
            _data.erp_leadId            = leadId;
            _data.erp_attachmentName    = model.erp_attachmentName
            _data.erp_attachmentType    = model.erp_attachment.type.split("/")[1];
            _data.erp_source            = noteType;
            _data.erp_createdBy         = id;
            attachData.push(_data);
            API.upload('lead/'+leadId+'/leadAttachments',{ properties: attachData ,attachments:file}).then(function(response){
                q.resolve(response.data);
            },function(error){
                q.reject(error)
            });
        })
      return q.promise;
   }
});