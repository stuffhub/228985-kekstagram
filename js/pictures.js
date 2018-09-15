'use strict';

(function () {
  var AMOUNT_OF_PHOTOS = 25;
  var MIN_AMOUNT_LIKES = 15;
  var MAX_AMOUNT_LIKES = 200;
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

  var getRandomValue = function (max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getComments = function () {
    var randomComment = '';
    for (var i = 0; i < getRandomValue(2, 1); i++) {
      randomComment +=
        RANDOM_COMMENTS[getRandomValue(RANDOM_COMMENTS.length - 1)] + ' ';
    }
    return randomComment;
  };

  var getPhotos = function () {
    var arrayPhotos = [];
    for (var i = 1; i <= AMOUNT_OF_PHOTOS; i++) {
      arrayPhotos.push({
        url: 'photos/' + i + '.jpg',
        likes: getRandomValue(MIN_AMOUNT_LIKES, MAX_AMOUNT_LIKES),
        getRandomComments: getComments(),
        description:
          RANDOM_DESCRIPTION[getRandomValue(RANDOM_DESCRIPTION.length - 1)]
      });
    }
    return arrayPhotos;
  };

  var listPhotos = getPhotos();

  var templatePicture = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  var renderElement = function (element) {
    var pictureElement = templatePicture.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = element.url;
    pictureElement.querySelector('.picture__likes').textContent = element.likes;
    pictureElement.querySelector('.picture__comments').textContent =
      element.getRandomComments.length;
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

  var makeComment = function (element) {
    var comment = makeElement('li', 'social__comment');
    var commentAvatar = makeElement('img', 'social__picture');
    commentAvatar.src = 'img/avatar-' + getRandomValue(1, 6) + '.svg';
    commentAvatar.alt = 'Аватар комментатора фотографии';
    commentAvatar.width = AVATAR_SIZE;
    commentAvatar.height = AVATAR_SIZE;
    comment.appendChild(commentAvatar);
    var commentText = makeElement(
        'p',
        'social__text',
        element.getRandomComments
    );
    comment.appendChild(commentText);
    return comment;
  };

  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture
    .querySelector('.social__comment-count')
    .classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

  var fillOverlay = function (element) {
    bigPicture.querySelector('.big-picture__img img').src = element.url;
    bigPicture.querySelector('.likes-count').textContent = element.likes;
    bigPicture.querySelector('.comments-count').textContent =
      element.getRandomComments.length;
    bigPicture.querySelector('.social__caption').textContent =
      element.description;
  };
  var fragmentPictures = document.createDocumentFragment();
  var fragmentComments = document.createDocumentFragment();
  var containerPictures = document.querySelector('.pictures');
  var containerComments = document.querySelector('.social__comments');
  for (var i = 0; i < AMOUNT_OF_PHOTOS; i++) {
    if (i === 0) {
      fillOverlay(listPhotos[i]);
      for (var j = 0; j < 2; j++) {
        fragmentComments.appendChild(makeComment(listPhotos[j]));
      }
    }
    fragmentPictures.appendChild(renderElement(listPhotos[i]));
  }
  containerComments.appendChild(fragmentComments);
  containerPictures.appendChild(fragmentPictures);
})();
