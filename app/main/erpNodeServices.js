angular.module('sbAdminApp').factory('ErpNodeServices',function($q,FormData,ErpNode,API,Session){
  return {
    createForm : createForm
    ,Search : Search
    ,getName : getName
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

  function getName(id){
    var data = JSON.parse(Session.get('employee'))
        ,len = data.length;
    for(var i=0;i<len;i++){
        if(data[i].erp_emp_id == id){
             return data[i].erp_emp_name;
        };
    }
  }
})
