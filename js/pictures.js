'use strict';

(function () {
  var MAX_AMOUNT_HASHTAGS = 5;
  var MAX_AMOUNT_LETTERS_HASHTAGS = 20;
  var AMOUNT_OF_PHOTOS = 25;
  var MIN_AMOUNT_LIKES = 15;
  var MAX_AMOUNT_LIKES = 200;
  var ESC_KEY = 27;
  var AVATAR_SIZE = '35';
  var RANDOM_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var RANDOM_DESCRIPTION = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var getRandomNumber = function (max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrayValue = function (array) {
    return array[getRandomNumber(array.length - 1)];
  };

  var getComments = function () {
    var arrayRandomComments = [];
    for (var i = 0; i < getRandomNumber(5, 1); i++) {
      var arrayRandomString = [];
      for (var j = 0; j < getRandomNumber(2, 1); j++) {
        arrayRandomString[j] = getRandomArrayValue(RANDOM_COMMENTS);
      }
      arrayRandomComments.push(arrayRandomString.join(' '));
    }
    return arrayRandomComments;
  };

  var getPhotos = function () {
    var arrayPhotos = [];
    for (var i = 1; i <= AMOUNT_OF_PHOTOS; i++) {
      arrayPhotos.push({
        url: 'photos/' + i + '.jpg',
        likes: getRandomNumber(MIN_AMOUNT_LIKES, MAX_AMOUNT_LIKES),
        comments: getComments(),
        description: getRandomArrayValue(RANDOM_DESCRIPTION)
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

  var makeElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };

  var makeComment = function (commentString) {
    var comment = makeElement('li', 'social__comment');
    var commentAvatar = makeElement('img', 'social__picture');
    commentAvatar.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    commentAvatar.alt = 'Аватар комментатора фотографии';
    commentAvatar.width = AVATAR_SIZE;
    commentAvatar.height = AVATAR_SIZE;
    comment.appendChild(commentAvatar);
    var commentText = makeElement('p', 'social__text', commentString);
    comment.appendChild(commentText);
    return comment;
  };

  var fillOverlay = function (element) {
    bigPicture.querySelector('.big-picture__img img').src = element.url;
    bigPicture.querySelector('.likes-count').textContent = element.likes;
    bigPicture.querySelector('.comments-count').textContent =
      element.comments.length;
    bigPicture.querySelector('.social__caption').textContent =
      element.description;
  };

  var createFragmentComment = function (objectPhoto) {
    var fragmentComments = document.createDocumentFragment();
    for (var i = 0; i < objectPhoto.comments.length; i++) {
      fragmentComments.appendChild(makeComment(objectPhoto.comments[i]));
    }
    return fragmentComments;
  };

  var createFragmentPicture = function () {
    var fragmentPictures = document.createDocumentFragment();
    for (var i = 0; i < AMOUNT_OF_PHOTOS; i++) {
      fragmentPictures.appendChild(renderElement(listPhotos[i]));
    }
    return fragmentPictures;
  };

  var showOverlay = function (element, listener) {
    element.classList.remove('hidden');
    document.addEventListener('keydown', listener);
  };

  var hideOverlay = function (element, listener, clearElementValue) {
    element.classList.add('hidden');
    document.removeEventListener('keydown', listener);
    if (clearElementValue) {
      clearElementValue.value = '';
    }
  };

  var pictureHideHandler = function () {
    hideOverlay(bigPicture, pictureHideEscHandler);
  };

  var pictureHideEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      hideOverlay(bigPicture, pictureHideEscHandler);
    }
  };

  var removeCommentsOverlay = function () {
    while (containerComments.firstChild) {
      containerComments.removeChild(containerComments.firstChild);
    }
  };

  var renderPicture = function (picture, index) {
    picture.addEventListener('click', function (evt) {
      evt.preventDefault();
      removeCommentsOverlay();
      showOverlay(bigPicture, pictureHideEscHandler);
      fillOverlay(listPhotos[index]);
      containerComments.appendChild(createFragmentComment(listPhotos[index]));
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
  var containerComments = document.querySelector('.social__comments');

  containerPictures.appendChild(createFragmentPicture());

  var listPictures = containerPictures.querySelectorAll('.picture');

  for (var i = 0; i < listPictures.length; i++) {
    var picture = listPictures[i];
    renderPicture(picture, i);
  }

  var fileUploadHandler = function () {
    showOverlay(filterOverlay, filterHideEscHandler);
  };

  var filteHideHandler = function () {
    hideOverlay(filterOverlay, filterHideEscHandler, uploadFile);
  };

  var filterHideEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      hideOverlay(filterOverlay, filterHideEscHandler, uploadFile);
    }
  };

  var filterCheckHandler = function (input) {
    input.addEventListener('click', function () {
      imagePreview.className = '';
      var currentSelectedFilter = filterList[input.id];
      imagePreview.classList.add(currentSelectedFilter);
    });
  };

  var uploadFile = containerPictures.querySelector('#upload-file');
  var filterOverlay = containerPictures.querySelector('.img-upload__overlay');
  var closeFilterOverlay = filterOverlay.querySelector('#upload-cancel');
  var imagePreview = filterOverlay.querySelector('.img-upload__preview img');
  var filterMode = filterOverlay.querySelectorAll('.effects__radio');
  var filterList = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };

  for (i = 0; i < filterMode.length; i++) {
    filterCheckHandler(filterMode[i]);
  }

  uploadFile.addEventListener('change', fileUploadHandler);
  closeFilterOverlay.addEventListener('click', filteHideHandler);

  // valid
  var isMissHash = function (value) {
    return value[0] !== '#' ? true : false;
  };
  var isMissSpace = function (value) {
    var reg = /[\S][#]/;
    return value.match(reg) ? true : false;
  };
  var isMissHashList = function (value) {
    var hashTags = value.split(' ');
    var flag;
    for (i = 0; i < hashTags.length; i++) {
      if (isMissHash(hashTags[i])) {
        flag = true;
      } else {
        flag = false;
      }
    }
    return flag;
  };
  var isOnlyHash = function (value) {
    var hashTags = value.split(' ');
    for (i = 0; i < hashTags.length; i++) {
      if (hashTags[i] === '#') {
        return true;
      } else {
        return false;
      }
    }
  };
  var isUnique = function (value) {
    var hashTags = value.split(' ');
    for (i = 0; i < hashTags.length - 1; i++) {
      for (var j = i + 1; j < hashTags.length; j++) {
        if (hashTags[i] === hashTags[j]) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  var isExceedAmount = function (value) {
    var hashTags = value.split(' ');
    return hashTags.length > MAX_AMOUNT_HASHTAGS ? true : false;
  };
  var isExceedAmountLetter = function (value) {
    var hashTags = value.split(' ');
    for (i = 0; i < hashTags.length; i++) {
      if (hashTags[i].length > MAX_AMOUNT_LETTERS_HASHTAGS) {
        return true;
      } else {
        return false;
      }
    }
  };
  var inputHashtagValidation = function (input, inputValue) {
    if (isMissHashList(inputValue)) {
      input.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
    } else if (isMissSpace(inputValue)) {
      input.setCustomValidity('Хэш-теги разделяются пробелами');
    } else if (isOnlyHash(inputValue)) {
      input.setCustomValidity(
          'Хэш-тег не может состоять только из одной решётки'
      );
    } else if (isUnique(inputValue)) {
      input.setCustomValidity(
          'Один и тот же хэш-тег не может быть использован дважды'
      );
    } else if (isExceedAmount(inputValue)) {
      input.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    } else if (isExceedAmountLetter(inputValue)) {
      input.setCustomValidity(
          'Максимальная длина одного хэш-тега 20 символов включая решётку'
      );
    } else {
      input.setCustomValidity('');
    }
  };

  var inputChangeHandler = function (evt) {
    var input = evt.target;
    var inputValue = input.value.toLowerCase();
    if (inputValue.length > 0) {
      input.required = true;
      inputHashtagValidation(input, inputValue);
    } else {
      input.setCustomValidity('');
      input.required = false;
    }
  };

  var uploadForm = containerPictures.querySelector('#upload-select-image');
  var inputHashtag = uploadForm.querySelector('.text__hashtags');
  inputHashtag.addEventListener('change', inputChangeHandler);
  inputHashtag.addEventListener('focus', function () {
    document.removeEventListener('keydown', filterHideEscHandler);
  });
  inputHashtag.addEventListener('blur', function () {
    document.addEventListener('keydown', filterHideEscHandler);
  });
})();
