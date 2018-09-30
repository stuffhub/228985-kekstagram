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

  window.constants = {
    MAX_AMOUNT_HASHTAGS: MAX_AMOUNT_HASHTAGS,
    MAX_AMOUNT_LETTERS_HASHTAGS: MAX_AMOUNT_LETTERS_HASHTAGS,
    AMOUNT_OF_PHOTOS: AMOUNT_OF_PHOTOS,
    MIN_AMOUNT_LIKES: MIN_AMOUNT_LIKES,
    MAX_AMOUNT_LIKES: MAX_AMOUNT_LIKES,
    ESC_KEY: ESC_KEY,
    AVATAR_SIZE: AVATAR_SIZE,
    RANDOM_COMMENTS: RANDOM_COMMENTS,
    RANDOM_DESCRIPTION: RANDOM_DESCRIPTION
  };

})();
