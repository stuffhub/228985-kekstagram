'use strict';

(function () {
  window.uploadPhoto = function () {
    var file = window.pictures.uploadFile.files[0];
    var fileName = file.name.toLowerCase();
    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        window.filter.imagePreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };
})();
