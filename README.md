# focus-action
### 统一移动端输入框获取焦点的行为，解决点击不灵敏、迟钝和键盘遮挡等问题。
### unify the behavior of input box to get focus

## install
```
npm install focus-action --save

 or

yarn add focus-action
```

## Usage

Next, import the module in your application module:
```
import 'focus-action'

 or

<script src="focus-action.min.js"></script>
```

通过挂载事件实现，引入库即可。
OK !

## TIP
```
安卓下如果输入框获取焦点时不发生窗口尺寸变化，则会在body的直接子元素上添加transform样式。
建议webview弹出键盘时改变窗口高度。
```
