/**
 * Created by 刘昌康 on 2019/8/19.
 * focus-action
 */
window.addEventListener('DOMContentLoaded', function () {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var isIos = /iphone/.test(sUserAgent) || /ipad/.test(sUserAgent);
  var isAndroid = !isIos && /android/.test(sUserAgent);
  var waitResize = false; // 获取焦点时等待resize事件的开关

  // 有元素获取焦点时把元素，如果不在可视区域就将元素滚动至可视区域
  document.addEventListener('focusin', function (e) {
    setTimeout(function () {
      if (e.target.getBoundingClientRect().bottom > document.documentElement.clientHeight || e.target.getBoundingClientRect().top < 0)
        e.target.scrollIntoView(false);
    }, 300);
  });

  if (isIos) {
    // ios键盘弹出移位后不滚动回原位的解决
    document.addEventListener('focusout', function () {
      var focusScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      setTimeout(function() {
        if (document.querySelector(':focus')) return;
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
    // 添加html向上偏移的class
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'html.focus-action-up{transform:translate(0,-33vh);-webkit-transform:translate(0,-33vh)}';
    document.head.appendChild(style);

    // 安卓弹出键盘发生窗口尺寸变化后元素在屏幕外就让元素滚动回可视区域
    window.addEventListener('resize', function () {
      waitResize = false; // 触发resize后下面的事件就不用等待
      var inputElem = document.querySelector(':focus');
      if (inputElem) {
        setTimeout(function () {
          if (inputElem.getBoundingClientRect().bottom > document.documentElement.clientHeight)
            inputElem.scrollIntoView(false);
        }, 330);
      }
    });

    // 有元素获取焦点后计算是否在可视区域，用在弹出键盘不改变窗口尺寸的情况下，所以代码发生在resize事件定时器后，添加向上移动的样式，并将焦点元素滚动至屏幕上半区
    document.addEventListener('focusin', function (e) {
      if (e.target.getBoundingClientRect().top < window.innerHeight / 5) { // 输入框离顶部近的时候移除样式
        document.documentElement.classList.remove('focus-action-up');
      } else {
        waitResize = true; // 开始等待resize事件
        setTimeout(function () {
          if (waitResize && e.target.getBoundingClientRect().top > window.innerHeight / 2) { // 未等到resize事件且元素在下半屏幕
            waitResize = false; // 不用等resize了...
            document.documentElement.classList.add('focus-action-up');
          }
        }, 500);
      }
    });

    // 一个元素失去焦点后检测是否还有焦点元素，没有的话删除填充底部的样式
    document.addEventListener('focusout', function () {
      setTimeout(function () {
        waitResize = false; // 切换input不监听resize
        if (!document.querySelector(':focus'))
          document.documentElement.classList.remove('focus-action-up');
      }, 9);
    });
  }
});


