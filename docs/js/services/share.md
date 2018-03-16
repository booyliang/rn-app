# 分享

## 方法

-	`open(data)`

	调起分享。

	参数：

	-	`data: object`

		分享需要的数据。有以下属性：

		-	`title: string`

			标题。

		-	`content: string`

			内容。

		-	`image: string`

			图片地址。

		-	`url: string`

			落地页地址。

	返回：`Promise`。分享成功后 `resolve`。