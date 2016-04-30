angular.module('sbAdminApp').factory('ErpNodeServices',function($q,FormData,ErpNode,API){
  return {
    createForm : createForm
    ,Search : Search
  }

  function createForm(data){
    var _q = $q.defer()
        ,_data = ErpNode.Form(data);
        _q.resolve(_data);
    return {data:_data.data,promise:_q.promise};
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
