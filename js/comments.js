'use strict';

(function () {

  var makeComment = function (commentString) {
    var comment = window.utility.makeElement('li', 'social__comment');
    var commentAvatar = window.utility.makeElement('img', 'social__picture');
    commentAvatar.src = 'img/avatar-' + window.utility.getRandomNumber(1, 6) + '.svg';
    commentAvatar.alt = 'Аватар комментатора фотографии';
    commentAvatar.width = window.constants.AVATAR_SIZE;
    commentAvatar.height = window.constants.AVATAR_SIZE;
    comment.appendChild(commentAvatar);
    var commentText = window.utility.makeElement('p', 'social__text', commentString);
    comment.appendChild(commentText);
    return comment;
  };

  var containerComments = document.querySelector('.social__comments');

  window.comments = {
    containerComments: containerComments,
    getComments: function () {
      var arrayRandomComments = [];
      for (var i = 0; i < window.utility.getRandomNumber(5, 1); i++) {
        var arrayRandomString = [];
        for (var j = 0; j < window.utility.getRandomNumber(2, 1); j++) {
          arrayRandomString[j] = window.utility.getRandomArrayValue(window.constants.RANDOM_COMMENTS);
        }
        arrayRandomComments.push(arrayRandomString.join(' '));
      }
      return arrayRandomComments;
    },
    createFragmentComment: function (objectPhoto) {
      var fragmentComments = document.createDocumentFragment();
      for (var i = 0; i < objectPhoto.comments.length; i++) {
        fragmentComments.appendChild(makeComment(objectPhoto.comments[i]));
      }
      return fragmentComments;
    },
    removeCommentsOverlay: function () {
      while (this.containerComments.firstChild) {
        this.containerComments.removeChild(this.containerComments.firstChild);
      }
    },
  };
})();
