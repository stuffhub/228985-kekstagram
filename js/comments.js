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

  var createFragmentComment = function (objectPhoto) {
    var fragmentComments = document.createDocumentFragment();
    for (var i = 0; i < objectPhoto.comments.length; i++) {
      if (i < window.constants.MAX_AMOUNT_COMMENTS) {
        fragmentComments.appendChild(makeComment(objectPhoto.comments[i]));
      }
    }
    return fragmentComments;
  };

  var removeCommentsOverlay = function () {
    while (containerComments.firstChild) {
      containerComments.removeChild(containerComments.firstChild);
    }
  };

  var containerComments = document.querySelector('.social__comments');

  window.comments = {
    containerComments: containerComments,
    createFragmentComment: createFragmentComment,
    removeCommentsOverlay: removeCommentsOverlay,
  };
})();
