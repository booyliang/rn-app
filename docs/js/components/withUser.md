# `withUser(shoudSignIn)`

返回高阶组件的高阶组件[^1]。

使传入的组件可以访问用户信息。

## 参数

- `shoudSignIn`

  **类型**：`Boolean`。

  **默认值**：`true`。

## 新组件 `props`

- `user`

  用户信息。

  **类型**：`Object`。



[^1]: 详见[高阶组件与装饰器](../hoc-and-decorator.md)。