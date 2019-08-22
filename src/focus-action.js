/**
 * Created by 刘昌康 on 2019/8/19.
 * focus-action
 */
window.addEventListener('DOMContentLoaded', function () {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var isIos = /iphone/.test(sUserAgent) || /ipad/.test(sUserAgent);
  var isAndroid = !isIos && /android/.test(sUserAgent);

  if (isIos) {
    document.addEventListener('focusout', function () {
      var focusScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      setTimeout(function() {
        if (document.body.scrollTop) {
          document.body.scrollTop = focusScrollTop;
        } else if (document.documentElement.scrollTop) {
          document.documentElement.scrollTop = focusScrollTop;
        }
      }, 0);
    });

    document.addEventListener('click', function (e) {
      if (/INPUT|TEXTAREA/i.test(e.target.tagName)) {
        e.target.focus();
      }
    });
  } else if (isAndroid) {
    document.addEventListener('click', function (e) {
      var inputElem = document.body.querySelector(':focus');
      if (inputElem && inputElem !== e.target) {
        inputElem.blur();
      }
    });

    window.addEventListener('resize', function () {
      var inputElem = document.body.querySelector(':focus');
      if (inputElem) {
        setTimeout(function () {
          if (inputElem.getBoundingClientRect().bottom > document.documentElement.clientHeight)
            inputElem.scrollIntoView(false);
        }, 300);
      }
    });
  }

  document.addEventListener('focusin', function (e) {
    setTimeout(function () {
      if (e.target.getBoundingClientRect().bottom > document.documentElement.clientHeight)
        e.target.scrollIntoView(false);
    }, 300);
  });
});


