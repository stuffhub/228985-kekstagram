'use strict';

(function () {
  var MAX_AMOUNT_HASHTAGS = 5;
  var MAX_AMOUNT_LETTERS_HASHTAGS = 20;
  var MAX_AMOUNT_COMMENTS = 5;
  var MIN_AMOUNT_LIKES = 15;
  var MAX_AMOUNT_LIKES = 200;
  var MAX_AMOUNT_LETTERS_DESCRIPTION = 140;
  var ESC_KEY = 27;
  var AVATAR_SIZE = '35';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
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
    MAX_AMOUNT_COMMENTS: MAX_AMOUNT_COMMENTS,
    MIN_AMOUNT_LIKES: MIN_AMOUNT_LIKES,
    MAX_AMOUNT_LIKES: MAX_AMOUNT_LIKES,
    ESC_KEY: ESC_KEY,
    AVATAR_SIZE: AVATAR_SIZE,
    RANDOM_DESCRIPTION: RANDOM_DESCRIPTION,
    MAX_AMOUNT_LETTERS_DESCRIPTION: MAX_AMOUNT_LETTERS_DESCRIPTION,
    FILE_TYPES: FILE_TYPES
  };

})();
