"use strict";

(function() {
  var AMOUNT_OF_PHOTOS = 25;
  var MIN_AMOUNT_LIKES = 15;
  var MAX_AMOUNT_LIKES = 200;
  var AVATAR_SIZE = "35";
  var RANDOM_COMMENTS = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
  ];
  var RANDOM_DESCRIPTION = [
    "Тестим новую камеру!",
    "Затусили с друзьями на море",
    "Как же круто тут кормят",
    "Отдыхаем...",
    "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......",
    "Вот это тачка!"
  ];

  var getRandomNumber = function(max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  var getRandomArrayValue = function(array) {
    return array[getRandomNumber(array.length - 1)];
  };

  var getComments = function() {
    var arrayRandomComments = [];
    for (var i = 0; i < getRandomNumber(2, 1); i++) {
      arrayRandomComments.push(getRandomArrayValue(RANDOM_COMMENTS));
    }
    return arrayRandomComments;
  };

  var getPhotos = function() {
    var arrayPhotos = [];
    for (var i = 1; i <= AMOUNT_OF_PHOTOS; i++) {
      arrayPhotos.push({
        url: "photos/" + i + ".jpg",
        likes: getRandomNumber(MIN_AMOUNT_LIKES, MAX_AMOUNT_LIKES),
        comments: getComments(),
        description: getRandomArrayValue(RANDOM_DESCRIPTION)
      });
    }
    return arrayPhotos;
  };
  
  var renderElement = function(element) {
    var pictureElement = templatePicture.cloneNode(true);
    pictureElement.querySelector(".picture__img").src = element.url;
    pictureElement.querySelector(".picture__likes").textContent = element.likes;
    pictureElement.querySelector(".picture__comments").textContent =
      element.comments.length;
    return pictureElement;
  };

  var makeElement = function(tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };

  var makeComment = function(element) {
    var comment = makeElement("li", "social__comment");
    var commentAvatar = makeElement("img", "social__picture");
    commentAvatar.src = "img/avatar-" + getRandomNumber(1, 6) + ".svg";
    commentAvatar.alt = "Аватар комментатора фотографии";
    commentAvatar.width = AVATAR_SIZE;
    commentAvatar.height = AVATAR_SIZE;
    comment.appendChild(commentAvatar);
    var commentText = makeElement("p", "social__text", element.comments.join(' '));
    comment.appendChild(commentText);
    return comment;
  };

  var fillOverlay = function(element) {
    bigPicture.querySelector(".big-picture__img img").src = element.url;
    bigPicture.querySelector(".likes-count").textContent = element.likes;
    bigPicture.querySelector(".comments-count").textContent =
      element.comments.length;
    bigPicture.querySelector(".social__caption").textContent =
      element.description;
  };
  
  var createFragmentComment = function () {
    var fragmentComments = document.createDocumentFragment();
    for (var i = 0; i <= getRandomNumber(5, 1); i++) {
      fragmentComments.appendChild(makeComment(listPhotos[i]))
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

  var listPhotos = getPhotos();

  var templatePicture = document
    .querySelector("#picture")
    .content.querySelector(".picture");

  var bigPicture = document.querySelector(".big-picture");
  bigPicture.classList.remove("hidden");
  bigPicture
    .querySelector(".social__comment-count")
    .classList.add("visually-hidden");
  bigPicture.querySelector(".comments-loader").classList.add("visually-hidden");

  var containerPictures = document.querySelector(".pictures");
  var containerComments = document.querySelector(".social__comments");
  
  fillOverlay(listPhotos[0]);
  containerComments.appendChild(createFragmentComment());
  containerPictures.appendChild(createFragmentPicture());
  
})();
