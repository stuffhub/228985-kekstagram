'use strict';

(function () {
  var createXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status);
      }
    });
    return xhr;
  };

  var loadData = function (onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);
    xhr.open('GET', picturesUsersUrl);
    xhr.send();
  };

  var saveData = function (data, onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);
    xhr.open('POST', sendDataFormUrl);
    xhr.send(data);
  };

  var picturesUsersUrl = 'https://js.dump.academy/kekstagram/data';
  var sendDataFormUrl = 'https://js.dump.academy/kekstagram';

  window.backend = {
    loadData: loadData,
    saveData: saveData
  };

})();
