angular.module('sbAdminApp').factory('ErpNodeServices',function($q,FormData,ErpNode,API){
  return {
    createForm : createForm
    ,Search : Search
  }

  function createForm(data){
    var _q = $q.defer();
        _q.resolve(ErpNode.Form(data));
    return _q.promise;
  }

  function Search(model){
    var _d = '?';
    for(key in model){
      _d +=key+'='+model[key]+'&';
    }
    _d = _d.slice(0, -1);
    return API.get('lead'+_d);
  }
})
