/**
 * Created by 刘昌康 on 2019/8/19.
 * focus-action
 */
setTimeout(function () {
  var document = window.document;
  var sUserAgent = navigator.userAgent.toLowerCase();
  var isIos = /iphone/.test(sUserAgent) || /ipad/.test(sUserAgent);
  var isAndroid = /android/.test(sUserAgent);

  function focusElem() {
    return document.body.querySelector(':focus');
  }

  // 判断焦点不触发高度变化的情况下输入框是否会被键盘遮挡
  function noResizeViewFocusElemVisibility(el) {
    if (window.orientation === undefined) {
      return true;
    }
    var orientation = window.orientation;
    // 横屏下输入框顶部高度小于三分之一屏幕为可见
    if ((orientation === 90 || orientation === -90) && el.getBoundingClientRect().top < window.screen.height / 3) {
      return true;
    }
    // 竖屏下输入框顶部距离小于（屏幕高度-屏幕宽度）为可见
    return (orientation === 0 || orientation === 180) && el.getBoundingClientRect().top < window.screen.height - window.screen.width;
  }

  // 有元素获取焦点时把元素，如果不在可视区域就将元素滚动至可视区域
  document.addEventListener('focusin', function (e) {
    setTimeout(function () {
      if (e.target === focusElem() && (e.target.getBoundingClientRect().bottom > window.innerHeight || e.target.getBoundingClientRect().top < 0)) {
        e.target.scrollIntoView(isAndroid);
      }
    }, 300);
  });

  if (isIos) {
    // ios键盘弹出移位后不滚动回原位的解决
    document.addEventListener('focusout', function () {
      var focusScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      setTimeout(function() {
        if (focusElem()) return;
        if (document.body.scrollTop) {
          document.body.scrollTop = focusScrollTop;
        } else if (document.documentElement.scrollTop) {
          document.documentElement.scrollTop = focusScrollTop;
        }
      }, 0);
    });

    // ios点击输入框迟钝和不反应的解决
    document.addEventListener('click', function (e) {
      if (/INPUT|TEXTAREA/i.test(e.target.tagName))
        e.target.focus();
    });
  } else if (isAndroid) {
    var style = document.createElement('style');
    style.type = 'text/css';
    document.head.appendChild(style);
    style.innerHTML = 'body.focus-action-up>*{transform:translate(0,-300px);-webkit-transform:translate(0,-300px)}';

    // 有元素获取焦点后计算是否在可视区域，用在弹出键盘不改变窗口尺寸的情况下，所以代码发生在resize事件定时器后，添加向上移动的样式，并将焦点元素滚动至屏幕上半区
    document.addEventListener('focusin', function (e) {
      var targetContentEditAble = e.target.getAttribute("contenteditable") === "" || e.target.getAttribute("contenteditable") === "true";
      if (!/input|textarea/i.test(e.target.tagName) && !targetContentEditAble) return;
      if (document.body.classList.contains('focus-action-up') && e.target.getBoundingClientRect().top < window.innerHeight / 6) { // 输入框离顶部近的时候移除样式
        document.body.classList.remove('focus-action-up');
      } else {
        var nowHeight = window.innerHeight;
        setTimeout(function () {
          if (focusElem() === e.target && window.innerHeight === nowHeight && !noResizeViewFocusElemVisibility(e.target)) { // 未改变高度且此刻元素在下半屏幕
            document.body.scrollTop += e.target.getBoundingClientRect().top / 2; // 可以滚动就滚动
            if (!noResizeViewFocusElemVisibility(e.target)) {
              document.body.classList.add('focus-action-up');
            }
          }
        }, 500);
      }
    });

    // 一个元素失去焦点后检测是否还有焦点元素，没有的话删除填充底部的样式
    document.addEventListener('focusout', function () {
      setTimeout(function () {
        if (!focusElem())
          document.body.classList.remove('focus-action-up');
      }, 9);
    });
  }
}, 0);
