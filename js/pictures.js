'use strict';

(function () {
  var renderElement = function (objectPhoto) {
    var pictureElement = templatePicture.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = objectPhoto.url;
    pictureElement.querySelector('.picture__likes').textContent =
      objectPhoto.likes;
    pictureElement.querySelector('.picture__comments').textContent =
      objectPhoto.comments.length;
    return pictureElement;
  };

  var fillOverlay = function (element) {
    bigPicture.querySelector('.big-picture__img img').src = element.url;
    bigPicture.querySelector('.likes-count').textContent = element.likes;
    bigPicture.querySelector('.comments-count').textContent =
      element.comments.length;
    bigPicture.querySelector(
        '.social__caption'
    ).textContent = window.utility.getRandomArrayValue(
        window.constants.RANDOM_DESCRIPTION
    );
  };

  var pictureHideHandler = function () {
    window.utility.hideOverlay(bigPicture, pictureHideEscHandler);
  };

  var pictureHideEscHandler = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEY) {
      window.utility.hideOverlay(bigPicture, pictureHideEscHandler);
    }
  };

  var renderPicture = function (picture, photoProperty) {
    picture.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.comments.removeCommentsOverlay();
      window.utility.showOverlay(bigPicture, pictureHideEscHandler);
      fillOverlay(photoProperty);
      window.comments.containerComments.appendChild(
          window.comments.createFragmentComment(photoProperty)
      );
    });
  };

  var templatePicture = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  var bigPicture = document.querySelector('.big-picture');
  var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');

  closeBigPicture.addEventListener('click', pictureHideHandler);

  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

  var containerPictures = document.querySelector('.pictures');
  var uploadFormFields = containerPictures.querySelectorAll(
      '#upload-select-image [type="text"]:not(.scale__control--value)'
  );

  var fileUploadHandler = function () {
    window.utility.showOverlay(
        window.filter.filterOverlay,
        filterHideEscHandler
    );
    window.uploadPhoto();
    window.filter.changeSaturation(100);
  };

  var filterHide = function () {
    window.utility.hideOverlay(
        window.filter.filterOverlay,
        filterHideEscHandler,
        uploadFile
    );
    for (var i = 0; i < uploadFormFields.length; i++) {
      uploadFormFields[i].value = '';
      uploadFormFields[i].style.border = 'none';
      uploadFormFields[i].required = false;
    }
  };

  var filterHideEscHandler = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEY) {
      window.utility.hideOverlay(
          window.filter.filterOverlay,
          filterHideEscHandler,
          uploadFile
      );
    }
  };

  var getPhotos = function (photos) {
    var fragmentPictures = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragmentPictures.appendChild(renderElement(photos[i]));
    }
    containerPictures.appendChild(fragmentPictures);
    var listPictures = containerPictures.querySelectorAll('.picture');
    for (i = 0; i < photos.length; i++) {
      renderPicture(listPictures[i], photos[i]);
    }
  };

  window.backend.loadData(getPhotos, window.backend.onErrorCallback);

  var uploadFile = containerPictures.querySelector('#upload-file');
  var uploadForm = containerPictures.querySelector('#upload-select-image');

  uploadFile.addEventListener('change', fileUploadHandler);

  window.pictures = {
    uploadForm: uploadForm,
    uploadFile: uploadFile,
    uploadFormFields: uploadFormFields,
    containerPictures: containerPictures,
    filterHideEscHandler: filterHideEscHandler,
    filterHide: filterHide
  };
})();
