# 登录、注册相关

## 方法

-	`in()`

	调起登录。

	返回：`Promise`。用户主动关闭时被 `reject`。

-	`up()`

	调起注册。

	返回：`Promise`。用户主动关闭时被 `reject`。

-	`updatePassword()`

	调起修改密码。

	返回：`Promise`。用户主动关闭时被 `reject`。

-	`isIn()`

	判断当前是否登录。

	返回：`boolean`。