angular.module('erp_core').factory('ErpNode', function () {
  return {
    Form: Form
  }

  //////////////////////////////////////////////
  //Locals

  function Form(data) {
    return {
      data: data
      , getModel: getModel
      , setModel: setModel
    }

    /////////////////////////////////////////////////
    // Locals
    /////////////////////////////////////////////////
    function getDropDownModel(data) {
      var temp = new Array()
        , len = data.length;
      for (var i = 0; i < len; i++) {
        temp.push(data[i].text);
      }
      return temp;
    }


    /////////////////////////////////////////////////
    function getModel() {
      var _data = this.data
        , _len = data.length
      model = new Object();
      //for(var i=0; i<len; i++){
      //var _data = data[i].data
      //,_len = _data.length;
      if (_len) {
        var _obj = {};
        for (var j = 0; j < _len; j++) {
          if (_data[j].model != undefined) {
            if (_data[j].type === 'erpMultiSelect') {
              _obj[_data[j].name] = getDropDownModel(_data[j].model).toString();
            } else if (_data[j].type == 'erpCalender') {
              _obj[_data[j].name] = moment(_data[j].model).format('DD/MM/YYYY');
            } else if (_data[j].type == 'erpSelect') {
              _obj[_data[j].name] = _data[j].model;
            } else if (_data[j].type == 'erpNumber') {
              _obj[_data[j].name] = parseInt(_data[j].model);
            } else if (_data[j].type == 'erpPeople') {
              if (_data[j].model.kids == 'Kids') {
                _obj.erp_kidsCount = 0;
              } else {
                _obj.erp_kidsCount = _data[j].model.kids;
              }
              _obj.erp_adultCount = _data[j].model.adults;
            } else if (_data[j].type == 'erpBookingStatus') {
              var _m = _data[j].model;
              for (_k in _m) {
                if (_m[_k] != '') _obj[_k] = _m[_k];
              }
            } else {
              _obj[_data[j].name] = _data[j].model;
            };
          };
        }
        model = _obj;
      }
      //}
      return model;
    }
    function setModel(model) {
      function setErpPeople(key, data, value) {
        var len = 0;
        if (data != undefined) len = data.length;
        for (var i = 0; i < len; i++) {
          if (data[i].type == 'erpPeople') {
            if (key == 'erp_adultCount') data[i].adults = value;
            if (key == 'erp_kidsCount') data[i].kids = value;
          }
        }
      }

      function _getAssignModel(model, data) {
        if (data.name === "erp_teams") {
          var temp = new Array();
          model.forEach(function (item) {
            temp.push(item.erp_team_id);
          });
          return temp;
        } else if (data.name === "erp_roles") {
          var temp = new Array();
          model.forEach(function (item) {
            temp.push(item.erp_role_id);
          });
          return temp;
        }
      }

      function Set(data, model) {
        if (data.type == 'erpText') {
          data.model = model;
        } else if (data.type == 'erpMultiSelect') {
          model = model.split(',');
          var _l = model.length
            , temp = new Array();
          for (var i = 0; i < _l; i++) {
            temp.push({ text: model[i] });
          }
          data.model = temp;
        } else if (data.type == 'erpCalender') {
          var temp = model.split('/')
            , _date = temp[2] + '-' + temp[1] + '-' + temp[0]
            , date = new Date(_date);
          data.model = date;
        } else if (data.type == 'erpBookingStatus') {
          data.erpBookingStatus = model;
        } else if (data.type == 'erpHotel') {
          data.setModel = model;
        } else if (data.type === 'erpAssign') {
          var _model = _getAssignModel(model, data);
          data.model = _model;
        } else {
          data.model = model;
        }
      };
      var len = this.data.length;
      for (key in model) {
        if (key == 'erp_adultCount' || key == 'erp_kidsCount') setErpPeople(key, data, model[key]);
        for (var i = 0; i < len; i++) {
          if (key == 'erp_tokenAmount' && data[i].name == 'erp_bookingStatus') data[i].erpTokenAmount = model[key];
          if (key == data[i].name) {
            Set(data[i], model[key]);
          }
        }
      }
    }
  }
})
