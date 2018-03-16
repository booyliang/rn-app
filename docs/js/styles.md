# 样式相关变量、函数

## 变量

| 名称							| 类型		| 说明								|
| ---							| ---		| ---								|
| `activeMaskBackgroundColor`	| `string`	| 点击状态下遮罩层的背景色。			|
| `antiBlock`					| `object`	| 使自身不撑满一行。					|
| `assistColor1`				| `string`	| 辅色。								|
| `assistColor`					| `string`	| 辅色。								|
| `backgroundColor`				| `string`	| 常用的背景色。						|
| `border`						| `object`	| 基本的边框样式。					|
| `borderBottom`				| `object`	| 基本的下边框样式。					|
| `borderColor`					| `string`	| 常用的边框颜色。					|
| `borderLeft`					| `object`	| 基本的左边框样式。					|
| `borderRight`					| `object`	| 基本的右边框样式。					|
| `borderTop`					| `object`	| 基本的上边框样式。					|
| `centerWrap`					| `object`	| 使子元素水平垂直居中。				|
| `errorColor`					| `string`	| 错误、警示颜色。					|
| `full`						| `object`	| 占满父级空间（绝对定位）。			|
| `goldenRatio`					| `number`	| 黄金分割比例。						|
| `inlineWrap`					| `object`	| 使子组件水平排列。					|
| `maskBackground`				| `object`	| 遮罩层背景（弹出层、悬浮控件等）。	|
| `padder`						| `object`	| 一般的横向留白。					|
| `padding`						| `string`	| 一般的横向留白数值（百分比）。		|
| `round`						| `object`	| 最大圆角。							|
| `statusBarHeight`				| `number`	| 状态栏高度。						|
| `tabFontSize`					| `string`	| 默认的 tab bar 字号。				|
| `textAssistColor`				| `string`	| 辅助文字的颜色。					|
| `textPrimaryColor`			| `string`	| 主要文字的颜色。					|
| `textSecondaryColor`			| `string`	| 次要文字的颜色。					|
| `themeColor`					| `string`	| 主题颜色。							|

## 函数

### `transformSize(designSize)`

把设计图上的尺寸数值转换成实际数值。

#### 参数

| 名称			| 类型		| 说明				|
| ---			| ---		| ---				|
| *`designSize`	| `Number`	| 设计图上的数值。	|

#### 返回

（`Number`）实际数值。

### `toPercent(designSize, parentSize)`

把设计图上的尺寸数值转换成百分比值。

#### 参数

| 名称			| 类型		| 说明					| 默认值			|
| ---			| ---		| ---					| ---			|
| *`designSize`	| `Number`	| 设计图上的尺寸。		| -				|
| `parentSize`	| `Number`	| 设计图上父元素的尺寸。	| 设计图总宽度。	|

#### 返回

（`String`）百分比值。