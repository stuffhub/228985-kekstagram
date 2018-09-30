'use strict';

(function () {

  var getPhotos = function () {
    var arrayPhotos = [];
    for (var i = 1; i <= window.constants.AMOUNT_OF_PHOTOS; i++) {
      arrayPhotos.push({
        url: 'photos/' + i + '.jpg',
        likes: window.utility.getRandomNumber(window.constants.MIN_AMOUNT_LIKES, window.constants.MAX_AMOUNT_LIKES),
        comments: window.comments.getComments(),
        description: window.utility.getRandomArrayValue(window.constants.RANDOM_DESCRIPTION)
      });
    }
    return arrayPhotos;
  };

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
    bigPicture.querySelector('.social__caption').textContent =
      element.description;
  };

  var createFragmentPicture = function () {
    var fragmentPictures = document.createDocumentFragment();
    for (var i = 0; i < window.constants.AMOUNT_OF_PHOTOS; i++) {
      fragmentPictures.appendChild(renderElement(listPhotos[i]));
    }
    return fragmentPictures;
  };

  var pictureHideHandler = function () {
    window.utility.hideOverlay(bigPicture, pictureHideEscHandler);
  };

  var pictureHideEscHandler = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEY) {
      window.utility.hideOverlay(bigPicture, pictureHideEscHandler);
    }
  };

  var renderPicture = function (picture, index) {
    picture.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.comments.removeCommentsOverlay();
      window.utility.showOverlay(bigPicture, pictureHideEscHandler);
      fillOverlay(listPhotos[index]);
      window.comments.containerComments.appendChild(window.comments.createFragmentComment(listPhotos[index]));
    });
  };

  var listPhotos = getPhotos();

  var templatePicture = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  var bigPicture = document.querySelector('.big-picture');
  var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');

  closeBigPicture.addEventListener('click', pictureHideHandler);

  bigPicture
    .querySelector('.social__comment-count')
    .classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

  var containerPictures = document.querySelector('.pictures');

  containerPictures.appendChild(createFragmentPicture());

  var listPictures = containerPictures.querySelectorAll('.picture');

  for (var i = 0; i < listPictures.length; i++) {
    var picture = listPictures[i];
    renderPicture(picture, i);
  }

  var fileUploadHandler = function () {
    window.utility.showOverlay(window.filter.filterOverlay, filterHideEscHandler);
    window.filter.changeSaturation(100);
  };

  var filteHideHandler = function () {
    window.utility.hideOverlay(window.filter.filterOverlay, filterHideEscHandler, uploadFile);
  };

  var filterHideEscHandler = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEY) {
      window.utility.hideOverlay(window.filter.filterOverlay, filterHideEscHandler, uploadFile);
    }
  };

  var uploadFile = containerPictures.querySelector('#upload-file');
  var uploadForm = containerPictures.querySelector('#upload-select-image');

  uploadFile.addEventListener('change', fileUploadHandler);

  window.pictures = {
    uploadForm: uploadForm,
    containerPictures: containerPictures,
    filterHideEscHandler: filterHideEscHandler,
    filteHideHandler: filteHideHandler,
  };

})();
