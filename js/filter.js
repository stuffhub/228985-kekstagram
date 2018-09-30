'use strict';

(function () {
  var changeSaturation = function (value) {
    var filterName = imagePreview.getAttribute('class');
    sliderPin.style.left = sliderDepthLine.style.width = value + '%';
    if (filterName === filterList['effect-none']) {
      imagePreview.style.filter = 'none';
    }
    if (filterName === filterList['effect-chrome']) {
      imagePreview.style.filter =
        'grayscale(' + window.utility.getProportion(1, 0, value) + ')';
    }
    if (filterName === filterList['effect-sepia']) {
      imagePreview.style.filter = 'sepia(' + window.utility.getProportion(1, 0, value) + ')';
    }
    if (filterName === filterList['effect-marvin']) {
      imagePreview.style.filter =
        'invert(' + window.utility.getProportion(100, 0, value) + '%)';
    }
    if (filterName === filterList['effect-phobos']) {
      imagePreview.style.filter = 'blur(' + window.utility.getProportion(3, 0, value) + 'px)';
    }
    if (filterName === filterList['effect-heat']) {
      imagePreview.style.filter =
        'brightness(' + window.utility.getProportion(3, 1, value) + ')';
    }
  };

  var pinPush = function () {
    var sliderCoords = window.utility.getCoords(slider);
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

  var filterList = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
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

  var filterOverlay = window.pictures.containerPictures.querySelector('.img-upload__overlay');
  var filterMode = filterOverlay.querySelectorAll('.effects__radio');
  var imagePreview = filterOverlay.querySelector('.img-upload__preview img');

  for (var i = 0; i < filterMode.length; i++) {
    filterCheckHandler(filterMode[i]);
  }

  var filterEffectLevel = filterOverlay.querySelector('.effect-level');
  var filterEffectValue = filterEffectLevel.querySelector(
      '.effect-level__value'
  );
  var slider = filterEffectLevel.querySelector('.effect-level__line');
  var sliderPin = filterEffectLevel.querySelector('.effect-level__pin');
  var sliderDepthLine = filterEffectLevel.querySelector('.effect-level__depth');

  var closeFilterOverlay = filterOverlay.querySelector('#upload-cancel');

  closeFilterOverlay.addEventListener('click', window.pictures.filteHideHandler);

  sliderPin.addEventListener('mousedown', pinPush);

  window.filter = {
    changeSaturation: changeSaturation,
    filterOverlay: filterOverlay
  };

})();
