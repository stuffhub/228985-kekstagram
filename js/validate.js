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
      input.setCustomValidity(inputHashtagValidation(inputValue).join(', '));
    } else {
      input.setCustomValidity('');
      input.required = false;
    }
  };

  var inputHashtag = window.pictures.uploadForm.querySelector('.text__hashtags');

  inputHashtag.addEventListener('change', inputChangeHandler);
  inputHashtag.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.pictures.filterHideEscHandler);
  });
  inputHashtag.addEventListener('blur', function () {
    document.addEventListener('keydown', window.pictures.filterHideEscHandler);
  });
})();
