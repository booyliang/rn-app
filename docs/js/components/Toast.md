# Toast

## 方法

-	`static show(message)`

	-	iOS：调用 [Native Base 的 `Toast.show`](https://docs.nativebase.io/Components.html#Toast)，但有以下特殊行为：

		-	支持 `string` 类型参数（推荐）。
		-	参数类型为 `object` 时，仅支持 `text` 属性（为兼容旧代码）。

	-	Android：调用 [React Native 的 `ToastAndroid.show`](http://facebook.github.io/react-native/docs/toastandroid.html#show)。