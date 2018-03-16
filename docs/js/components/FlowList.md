# FlowList
使用高阶函数withPage对[FlatList](https://reactnative.cn/docs/0.49/flatlist.html#content)的封装，实现了上拉刷新，下拉加载



## `props`

| 名称		| 类型		| 说明					|
| ---		| ---		| ---					|
| `request`	| `String|function`	|必传，请求参数	|
| `renderItem`	| `component`	|必传，列表元素组件	|
| `disabledPage`	| `bool`	|是否禁用分页	|
| `onFetchedData`	| `function`	|数据加载完后的回调	|
| `enableCacheFirstPage`	| `function`	|开启第一页数据缓存	|
| `disabledRefresh`	| `function`	|禁用下拉刷新	|


## `example`
```jsx
export default class CategoryScreen extends Component {
	renderItem = ({ item }) => <View style={{ height: 60 }}><Text>hello,分类列表</Text></View>
	buildRequest=() => {
		return {url:"/services/app/v1/home/list",params:{param1:'a'}}
	}
	render() {
		return (
			<View>
			<Nav title='详情'></Nav>	
			<FlowList 
				renderItem={this.renderItem}
				request="/services/app/v1/home/list"
				// request={()=>this.buildRequest}
			
			/>
			</View>)
	}
}
		
```