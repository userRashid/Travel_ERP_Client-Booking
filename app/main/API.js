////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Session
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('erp_core').factory('Session', function () {
  return {
    get: get
    , set: set
    , remove: remove
  };

  function get(key) {
    return sessionStorage.getItem(key);
  }

  function set(key, value) {
    sessionStorage[key] = value;
  }

  function remove(key) {
    sessionStorage.removeItem(key);
  }

});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WebServices
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('erp_core').factory('API', function ($http, $q, Session) {

  return {
    get: get
    , post: post
    , put: put
    , _delete: _delete
    , upload: upload
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // public
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function get(apiPath, headers) {
    if (typeof (headers) === 'undefined') headers = {};
    return httpRequest('GET', apiPath, headers);
  }

  function post(apiPath, data, headers) {
    if (typeof (data) === 'undefined') data = {};
    if (typeof (headers) === 'undefined') headers = {};
    return httpRequest('POST', apiPath, headers, data);
  }

  function put(apiPath, data, headers) {
    if (typeof (data) === 'undefined') data = {};
    if (typeof (headers) === 'undefined') headers = {};
    return httpRequest('PUT', apiPath, headers, data);
  }

  function _delete(apiPath, headers) {
    if (typeof (headers) === 'undefined') headers = {};
    return httpRequest('DELETE', apiPath, headers);
  }

  function upload(apiPath, _data) {
    return $http({
      method: 'POST',
      url: baseUrl() + apiPath,
      headers: { 'Content-Type': undefined },
      transformRequest: function (data) {
        var formData = new FormData();
        formData.append("properties", angular.toJson(data.properties));
        formData.append("file", data.attachments);
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
      if (Session.get(key) !== null) {
        headers[key] = Session.get(key);
      }
    }

    //inject('Authorization');
    //inject('repository');
    //inject('ticket');
    //inject('username');
    return headers;
  }

  function addToken(uri) {
    //console.log(Session.get('id') === null,Session.get('authToken') === null);
    if (Session.get('id') === null && Session.get('authToken') === null) return uri;
    if (uri.indexOf('?') !== -1) {
      uri = uri + '&token=' + Session.get('authToken') + '&id=' + Session.get('id');
    } else {
      uri = uri + '?token=' + Session.get('authToken') + '&id=' + Session.get('id');
    }
    return uri;

  }
  function httpRequest(method, apiPath, headers, data) {
    if (typeof (headers) === 'undefined' || !angular.isObject(headers)) {
      headers = {};
    }


    apiPath = addToken(apiPath);
    //headers = injectHeader(headers);
    var request = {
      method: method,
      url: baseUrl() + apiPath,
      headers: headers
    };
    if (typeof (data) !== 'undefined') {
      request.data = data;
    }

    var _h = $q.defer();

    $http(request).then(function (response) {
      if (response.hasOwnProperty('data') && response.data.hasOwnProperty('errorCode')) {
        _h.reject(response);
      } else {
        _h.resolve(response);
      }
    }, function (data, status, headers, config) {
      if (status == 408) {
        Session.remove('repository');
        Session.remove('ticket');
        Session.remove('username');
        Session.remove('user_name');
      }
    });
    return _h.promise;
  }
});




