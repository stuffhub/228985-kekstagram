'use strict';

(function () {
  var isMissHash = function (value) {
    return value[0] !== '#' ? true : false;
  };

  var isMissSpace = function (value) {
    var reg = /[\S][#]/;
    return value.match(reg) ? true : false;
  };

  var isMissHashList = function (value) {
    for (var i = 0; i < value.length; i++) {
      if (isMissHash(value[i])) {
        return true;
      }
    }
    return false;
  };

  var isOnlyHash = function (value) {
    for (var i = 0; i < value.length; i++) {
      if (value[i] === '#') {
        return true;
      }
    }
    return false;
  };

  var isUnique = function (value) {
    for (var i = 0; i < value.length - 1; i++) {
      for (var j = i + 1; j < value.length; j++) {
        if (value[i] === value[j]) {
          return true;
        }
      }
    }
    return false;
  };

  var isExceedAmount = function (value) {
    return value.length > window.constants.MAX_AMOUNT_HASHTAGS ? true : false;
  };

  var isExceedAmountLetter = function (value) {
    for (var i = 0; i < value.length; i++) {
      if (value[i].length > window.constants.MAX_AMOUNT_LETTERS_HASHTAGS) {
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
      input.style.border = '2px solid #F00';
      input.setCustomValidity(inputHashtagValidation(inputValue).join(', '));
    } else {
      input.setCustomValidity('');
      input.style.border = 'none';
      input.required = false;
    }
  };

  var textAreaChangeHandler = function (evt) {
    var textArea = evt.target;
    if (textArea.value.length > 0) {
      textArea.required = true;
      if (
        textArea.value.length > window.constants.MAX_AMOUNT_LETTERS_DESCRIPTION
      ) {
        textArea.style.border = '2px solid #F00';
        textArea.setCustomValidity(
            'Длина комментария не может составлять больше 140 символов'
        );
      } else {
        textArea.setCustomValidity('');
        textArea.style.border = 'none';
      }
    } else {
      textArea.required = false;
    }
  };

  var mainContainer = document.body.querySelector('main');

  var hideErrorMessageHandler = function (evt) {
    window.utility.hideOverlay(formResponseError, hideSuccessMessageEscHandler);
  };

  var hideErrorMessageEscHandler = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEY) {
      window.utility.hideOverlay(
          formResponseError,
          hideSuccessMessageEscHandler
      );
    }
  };

  var hideSuccessMessageHandler = function (evt) {
    window.utility.hideOverlay(
        formResponseSuccess,
        hideSuccessMessageEscHandler
    );
  };

  var hideSuccessMessageEscHandler = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEY) {
      window.utility.hideOverlay(
          formResponseSuccess,
          hideSuccessMessageEscHandler
      );
    }
  };

  var createFormResponseOverlay = function (
      templateName,
      templateButtonName,
      templateButtonHandler
  ) {
    var templateMessage = document
      .querySelector('#' + templateName)
      .content.querySelector('.' + templateName);
    var message = templateMessage.cloneNode(true);
    var messageButton = message.querySelector('.' + templateButtonName);
    message.classList.add('hidden');
    messageButton.addEventListener('click', templateButtonHandler);
    return message;
  };

  var formResponseSuccess = createFormResponseOverlay(
      'success',
      'success__button',
      hideSuccessMessageHandler
  );
  var formResponseError = createFormResponseOverlay(
      'error',
      'error__button',
      hideErrorMessageHandler
  );

  var sendFormResponse = function () {
    window.pictures.filterHide();
    mainContainer.appendChild(formResponseSuccess);
    window.utility.showOverlay(
        formResponseSuccess,
        hideSuccessMessageEscHandler
    );
  };

  var sendFormError = function () {
    window.utility.hideOverlay(
        window.filter.filterOverlay,
        window.pictures.filterHideEscHandler,
        window.pictures.uploadFile
    );
    mainContainer.appendChild(formResponseError);
    window.utility.showOverlay(formResponseError, hideErrorMessageEscHandler);
  };

  var sendFormHandler = function (evt) {
    window.backend.saveData(
        new FormData(window.pictures.uploadForm),
        sendFormResponse,
        sendFormError
    );
    evt.preventDefault();
  };

  var inputHashtag = window.pictures.uploadForm.querySelector(
      '.text__hashtags'
  );

  inputHashtag.addEventListener('change', inputChangeHandler);

  inputHashtag.addEventListener('focus', function () {
    window.utility.removeListener(
        'keydown',
        window.pictures.filterHideEscHandler
    );
  });

  inputHashtag.addEventListener('blur', function () {
    window.utility.addListener('keydown', window.pictures.filterHideEscHandler);
  });

  var textAreaDescription = window.pictures.uploadForm.querySelector(
      '.text__description'
  );

  textAreaDescription.addEventListener('change', textAreaChangeHandler);

  textAreaDescription.addEventListener('focus', function () {
    window.utility.removeListener(
        'keydown',
        window.pictures.filterHideEscHandler
    );
  });

  textAreaDescription.addEventListener('blur', function () {
    window.utility.addListener('keydown', window.pictures.filterHideEscHandler);
  });

  window.pictures.uploadForm.addEventListener('submit', sendFormHandler);
})();
