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
    changeSaturation(100);
  };

  var filteHideHandler = function () {
    hideOverlay(filterOverlay, filterHideEscHandler, uploadFile);
  };

  var filterHideEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      hideOverlay(filterOverlay, filterHideEscHandler, uploadFile);
    }
  };

  var changeSaturation = function (value) {
    var filterName = imagePreview.getAttribute('class');
    sliderPin.style.left = sliderDepthLine.style.width = value + '%';
    if (filterName === filterList['effect-none']) {
      imagePreview.style.filter = 'none';
    }
    if (filterName === filterList['effect-chrome']) {
      imagePreview.style.filter =
        'grayscale(' + getProportion(1, 0, value) + ')';
    }
    if (filterName === filterList['effect-sepia']) {
      imagePreview.style.filter = 'sepia(' + getProportion(1, 0, value) + ')';
    }
    if (filterName === filterList['effect-marvin']) {
      imagePreview.style.filter =
        'invert(' + getProportion(100, 0, value) + '%)';
    }
    if (filterName === filterList['effect-phobos']) {
      imagePreview.style.filter = 'blur(' + getProportion(3, 0, value) + 'px)';
    }
    if (filterName === filterList['effect-heat']) {
      imagePreview.style.filter =
        'brightness(' + getProportion(3, 1, value) + ')';
    }
  };

  var filterCheckHandler = function (input) {
    var currentFilterName = filterList[input.id];
    if (input.checked) {
      imagePreview.classList.add(currentFilterName);
    }
    input.addEventListener('click', function () {
      imagePreview.className = '';
      if (currentFilterName === 'effects__preview--none') {
        filterEffectLevel.style.display = 'none';
      } else {
        filterEffectLevel.style.display = 'block';
      }
      imagePreview.classList.add(currentFilterName);
      changeSaturation(100);
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
    for (i = 0; i < value.length; i++) {
      if (isMissHash(value[i])) {
        return true;
      }
    }
    return false;
  };
  var isOnlyHash = function (value) {
    for (i = 0; i < value.length; i++) {
      if (value[i] === '#') {
        return true;
      }
    }
    return false;
  };
  var isUnique = function (value) {
    for (i = 0; i < value.length - 1; i++) {
      for (var j = i + 1; j < value.length; j++) {
        if (value[i] === value[j]) {
          return true;
        }
      }
    }
    return false;
  };
  var isExceedAmount = function (value) {
    return value.length > MAX_AMOUNT_HASHTAGS ? true : false;
  };
  var isExceedAmountLetter = function (value) {
    for (i = 0; i < value.length; i++) {
      if (value[i].length > MAX_AMOUNT_LETTERS_HASHTAGS) {
        return true;
      }
    }
    return false;
  };
  var inputHashtagValidation = function (inputValue) {
    var mismatches = [];
    var hashTags = inputValue.split(' ');
    var filteredHashTags = hashTags.filter(function (hashTag) {
      return hashTag.length > 0;
    });
    if (isMissSpace(inputValue)) {
      mismatches.push('Хэш-теги разделяются пробелами');
    }
    if (isMissHashList(filteredHashTags)) {
      mismatches.push('Хэш-тег начинается с символа # (решётка)');
    }
    if (isOnlyHash(filteredHashTags)) {
      mismatches.push('Хэш-тег не может состоять только из одной решётки');
    }
    if (isUnique(filteredHashTags)) {
      mismatches.push('Один и тот же хэш-тег не может быть использован дважды');
    }
    if (isExceedAmount(filteredHashTags)) {
      mismatches.push('Нельзя указать больше пяти хэш-тегов');
    }
    if (isExceedAmountLetter(filteredHashTags)) {
      mismatches.push(
          'Максимальная длина одного хэш-тега 20 символов включая решётку'
      );
    }
    return mismatches;
  };

  var inputChangeHandler = function (evt) {
    var input = evt.target;
    var inputValue = input.value.toLowerCase();
    if (inputHashtagValidation(inputValue).length > 0) {
      input.required = true;
      input.setCustomValidity(inputHashtagValidation(inputValue).join(', '));
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

  // slider
  var getCoords = function (element) {
    var elementCoords = element.getBoundingClientRect();
    return {
      left: elementCoords.left
    };
  };

  var getProportion = function (max, min, value) {
    return ((max - min) * value) / 100 + min;
  };

  var pinPush = function () {
    var sliderCoords = getCoords(slider);
    var pinMoveHandler = function (moveEvt) {
      var sliderLeftPoint = moveEvt.clientX - sliderCoords.left;
      var sliderRightPoint = slider.offsetWidth;
      if (sliderLeftPoint < 0) {
        sliderLeftPoint = 0;
      }
      if (sliderLeftPoint > sliderRightPoint) {
        sliderLeftPoint = sliderRightPoint;
      }
      var effectValue = Math.round(
          (sliderLeftPoint / slider.offsetWidth) * 100
      );
      filterEffectValue.value = effectValue;
      changeSaturation(filterEffectValue.value);
    };
    var pinUpHandler = function () {
      document.removeEventListener('mousemove', pinMoveHandler);
      document.removeEventListener('mouseup', pinUpHandler);
    };
    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', pinUpHandler);
  };

  var filterEffectLevel = filterOverlay.querySelector('.effect-level');
  var filterEffectValue = filterEffectLevel.querySelector(
      '.effect-level__value'
  );
  var slider = filterEffectLevel.querySelector('.effect-level__line');
  var sliderPin = filterEffectLevel.querySelector('.effect-level__pin');
  var sliderDepthLine = filterEffectLevel.querySelector('.effect-level__depth');
  sliderPin.addEventListener('mousedown', pinPush);
})();
