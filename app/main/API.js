////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Session
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('sbAdminApp').factory('Session', function() {
  return {
    get: get
    ,set: set
    ,remove: remove
  };

  function get(key) {
    return sessionStorage.getItem(key);
  }

  function set(key,value) {
    sessionStorage[key] = value;
  }

  function remove(key) {
    sessionStorage.removeItem(key);
  }

});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WebServices
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('sbAdminApp').factory('API', function($http, $q, Session) {

  return {
    get: get
    ,post: post
    ,put: put
    ,_delete: _delete
    ,upload : upload
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // public
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function get(apiPath, headers) {
    if(typeof(headers) === 'undefined') headers = {};
    return httpRequest('GET', apiPath, headers);
  }

  function post(apiPath, data, headers) {
    if(typeof(data) === 'undefined') data = {};
    if(typeof(headers) === 'undefined') headers = {};
    return httpRequest('POST', apiPath, headers, data);
  }

  function put(apiPath, data, headers) {
    if(typeof(data) === 'undefined') data = {};
    if(typeof(headers) === 'undefined') headers = {};
    return httpRequest('PUT', apiPath, headers, data);
  }

  function _delete(apiPath, headers) {
    if(typeof(headers) === 'undefined') headers = {};
    return httpRequest('DELETE', apiPath, headers);
  }

   function upload(apiPath,_data){
     return $http({
                    method: 'POST',
                    url : baseUrl() + apiPath,
                    headers: { 'Content-Type': undefined },
                    transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("properties",angular.toJson( data.properties));
                    formData.append("file" , data.attachments);
                    return formData;
                    },
                    data: _data
                  });

   }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // private
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function baseUrl() {
    return baseApiUrl;
  }

  function injectHeader(headers) {
    function inject(key) {
      headers['Content-Type'] = Session.get(key);
      headers['Authorization'] = Session.get(key);
      if(Session.get(key) !== null) {
        headers[key] = Session.get(key);
      }
    }

    //inject('Authorization');
    //inject('repository');
    //inject('ticket');
    //inject('username');
    return headers;
  }

  function httpRequest(method, apiPath, headers, data) {
    if(typeof(headers) === 'undefined' || !angular.isObject(headers)) {
      headers = {};
    }

    //headers = injectHeader(headers);
    var request = {
      method: method,
      url: baseUrl() + apiPath,
      headers: headers
    };
    //console.log('request --- ',request);
    if(typeof(data) !== 'undefined') {
      request.data = data;
    }

    return $http(request).
    error(function(data, status, headers, config) {
      // handle session timeout
      if(status == 408) {
        Session.remove('repository');
        Session.remove('ticket');
        Session.remove('username');
        Session.remove('user_name');
      }
    });
  }

});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// interceptors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('sbAdminApp').config(function($httpProvider) {
  $httpProvider.interceptors.push(function($q) {
    return {
      'response': responseInterceptor
    };

    function responseInterceptor(response) {
      if(response.hasOwnProperty('data') && response.data.hasOwnProperty('errorCode')){
        return $q.reject(response);
        console.log('In');
      } else {
        return response;
      }
      /*
      // ticket handling
     *//* if(response.headers().hasOwnProperty('ticket')) {
        Session.set('ticket',response.headers()['ticket']);
      };*//*

      // error handling: check returncode in header
      if(response.hasOwnProperty('data') && response.data.hasOwnProperty('errorCode')){
        var error = response.data.errorCode != undefined;
        if(error) {
          return $q.reject(getErrorMessage(response,error));
        } else {
          // delayed response handling
          if(response.status == 202) {
          var delayedKey = response.data;
          //console.log('DELAYED Message '+ delayedKey);
          //return DelayedResponseQueue.register(delayedKey);
          } else {
            return response;
        }
      }
      }*/
    }

    function getErrorMessage(response,error) {
      var message = 'Error Code '+error;

      if(typeof(response) === 'object'
        && response.hasOwnProperty('data')
        && typeof(response.data) === 'object'
        && response.data.hasOwnProperty('Message'))
        message = response.data.Message;

      var temp = {code : error,msg : message};

      return temp;
    }

  });
});


