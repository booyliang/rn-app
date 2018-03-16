# `Touchable`

整合 React Native 自有的几个 [`Touchable*`][Touchable] 组件。当希望元素可点击时使用。

> 警告：基于 [`Touchable*`][Touchable] 的组件才能够处理 `onPress` 等点击回调，如果你发现传入这些回调不起作用，考虑使用本组件。

## `props`

> 接受 React Native 各 [`Touchable*`][Touchable] 组件的 `props`。

| 名称		| 类型		| 说明											| 取值																																																																																																																																																| 默认值			|
| ---		| ---		| ---											| ---																																																																																																																																																| ---			|
| `type`	| `String`	| 决定选用哪种 [`Touchable*`][Touchable] 组件。	| `'highlight'`：[`TouchableHighlight`](http://facebook.github.io/react-native/docs/touchablehighlight.html)，覆盖一层深色半透明遮罩；<br>`'opacity'`：[`TouchableOpacity`](http://facebook.github.io/react-native/docs/touchableopacity.html)，降低被点击元素的不透明度；<br>`'nativeFeedback'` （限 Android）：[`TouchableNativeFeedback`](http://facebook.github.io/react-native/docs/touchablenativefeedback.html)，Material Design 风格的波纹效果；<br>`'withoutFeedback'`：[`TouchableWithoutFeedback`](http://facebook.github.io/react-native/docs/touchablewithoutfeedback.html)，没有任何操作反馈。	| `'opacity'`	|

**一般原则**：

- 尽量选用 `'highlight'`[^1]；
- 当元素为纯文本、图标，无背景、无边框时考虑选用 `'opacity'`；
- 不建议使用 `'nativeFeedback'` （根据设计）；
- 反对使用 `'withoutFeedback'` （任何点击都应该有反馈）。

[^1]: 当直接子元素不是原生元素时，可能会报错——“Touchable child must either be native or forward setNativeProps to a native component”。此问题[有解](http://facebook.github.io/react-native/docs/direct-manipulation.html)，但需要明确的操作。为避免造成困扰，`Touchable` `type` 的默认值选取了 `'opacity'`。但一般情况下更推荐选用 `'highlight'`，更符合设计规律。



[Touchable]: http://facebook.github.io/react-native/docs/handling-touches.html#touchables