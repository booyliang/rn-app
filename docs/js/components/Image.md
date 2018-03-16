# 图片

封装自 [React Native 的 `Image`](http://facebook.github.io/react-native/docs/image.html)，继承它的所有行为。

## `props`

-	`maxWidth: PropTypes.number`

	最大宽度。传入则表示需要等比缩放（依赖图片 URL 中的查询参数 `w`、`h`）。

-	`placeholderDisabled: PropTypes.bool`

	禁用占位图。因为此组件默认会为远程图片添加占位图。

	默认值：`false`。