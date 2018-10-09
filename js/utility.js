'use strict';

(function () {
  window.utility = {
    getRandomNumber: function (max, min) {
      min = min || 0;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomArrayValue: function (array) {
      return array[this.getRandomNumber(array.length - 1)];
    },
    makeElement: function (tagName, className, text) {
      var element = document.createElement(tagName);
      element.classList.add(className);
      if (text) {
        element.textContent = text;
      }
      return element;
    },
    showOverlay: function (element, listener) {
      element.classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', listener);
    },
    hideOverlay: function (element, listener, clearElementValue) {
      element.classList.add('hidden');
      document.body.removeAttribute('class');
      document.removeEventListener('keydown', listener);
      if (clearElementValue) {
        clearElementValue.value = '';
      }
    },
    getCoords: function (element) {
      var elementCoords = element.getBoundingClientRect();
      return {
        left: elementCoords.left
      };
    },
    getProportion: function (max, min, value) {
      return ((max - min) * value) / 100 + min;
    },
    removeListener: function (onEvent, listener) {
      document.removeEventListener(onEvent, listener);
    },
    addListener: function (onEvent, listener) {
      document.addEventListener(onEvent, listener);
    },
  };
})();
