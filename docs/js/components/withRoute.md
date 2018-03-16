# `withRoute`

高阶组件。

使传入的组件带有路由功能。

传入的组件中，希望点击跳转的元素必须是[可触摸的](../touchable.md)，并且接受父级传入的 `onPress`（如：`onPress={this.props.onPress}`）。

## 新组件 `props`

### `route`

路由信息对象。将被传入 [`navigation.navigate`][navigation.navigate]。

**类型**：`PropTypes.object`、`PropTypes.string`。

**说明**：

当类型为对象时，含有以下属性：

-	`routeName`

	（必选）路由名称。

	**类型**：`String`。

> 其他属性参见 [`navigation.navigate`][navigation.navigate]。

当类型为字符串时，视作 `routeName`。



[navigation.navigate]:https://reactnavigation.org/docs/navigators/navigation-prop#navigate-Link-to-other-screens