# `collectProps`

高阶组件。

把原组件繁多的 `prop` 聚合到一个对象中去，把这个对象作为新的 `prop` 传入新组件。多用于希望把服务器返回的数据直接传入组件时。

## 格式

```js
collectProps(Component, propsMap, newPropName)
```

## 参数

| 名称			| 类型		| 说明																| 默认值		|
| ---			| ---		| ---																| ---		|
| *`propsMap`	| `Object`	| 新旧 `prop` 的映射关系。键为原组件的 `prop` 名，值为聚合后的对象的键。	| -			|
| `newPropName`	| `String`	| 聚合后的 `prop` 名。												| `'data'`	|

## 新组件 `props`

| 名称				| 类型		| 说明															|
| ---				| ---		| ---															|
| `[newPropName]`	| `Object`	| 聚合后的对象，其中每一个键对应的值，应该对应原组件的一个 `prop` 值。	|

## 示例

```jsx
// 直接调用，你可能需要这样：
<Component name="悠然一指" tags={['哦哦', '啊啊啊']} />

// 使用此高阶组件你可以这样：
const ComponentWithCollectedProps = collectProps(Component, {
	name: 'appName', // 简单地对应聚合后对象的一个键

	// 聚合后对象的某个字段值也许不符合组件要求，这时候可以传入一个处理函数去处理数据。
	tags: {
		key: 'appTags',

		handler(value) {
			return value.split(',');
		}
	}
});

// 假设这是服务器返回的实体数据
const data = {
	appName: '悠然一指',
	appTags: '哦哦,啊啊啊'
};

// ...

render() {
	return <ComponentWithCollectedProps data={data} />;
}
```