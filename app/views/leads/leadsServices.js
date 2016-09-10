(function () {

    angular
        .module('erp_leads')
        .factory('LeadsServices', LeadsServices);
    function LeadsServices(API, $q, Notify) {
        return {
            getLeadStatus: getLeadStatus
            , saveLead: saveLead
            , addAttachment: addAttachment
            , addAlert: addAlert
        };
        function saveLead(leadId, values) {
            var model = {};
            model[values.name] = values.model;
            API.put('lead/' + leadId, model).then(function (data) {
                Notify.add('success', 'Success', 'Lead Update');
            });
        }
        function getLeadStatus(key) {
            var q = $q.defer();
            API.get('/leadStatusValues').then(function (data) {
                q.resolve(data.data);
            });
            return q.promise;
        }
        function addAlert(promise, createdBy, leadId) {
            var q = $q.defer();
            promise.then(function (data) {
                var model = data.getModel();
                var _data = {};
                _data.erp_alertNotes = model.erp_description;
                _data.erp_alertDate = model.erp_datetime;
                _data.erp_alertStatus = "ACTIVE";
                _data.erp_emailNotification = false;
                _data.erp_createdById = createdBy;
                API.post('lead/' + leadId + '/alert', _data).then(function (response) {
                    response.erp_alertNotes = model.erp_description;
                    response.erp_alertDate = model.erp_datetime;
                    response.erp_source = 'Alert';
                    q.resolve(response);
                }, function (error) {
                    q.reject(error);
                });
            });
            return q.promise;
        };


        function addAttachment(leadId, promise, noteType, id) {
            var q = $q.defer();
            promise.then(function (data) {
                var _data = {},
                    attachData = [],
                    model = data.getModel(),
                    file = model.erp_attachment;
                _data.erp_attId = 0;
                _data.erp_leadId = leadId;
                _data.erp_attachmentName = file.name.split(".")[0]
                _data.erp_attachmentType = file.name.split(".")[1];
                _data.erp_source = noteType;
                _data.erp_createdBy = id;
                attachData.push(_data);
                API.upload('lead/' + leadId + '/leadAttachments', { properties: attachData, attachments: file }).then(function (response) {
                    q.resolve(response.data);
                }, function (error) {
                    q.reject(error);
                });
            });
            return q.promise;
        }
    };
})();