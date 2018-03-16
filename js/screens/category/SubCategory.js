import React from 'react';
import { withNavigation, Nav, View, YIcon, FlowList, Right, Button, StyleSheet, ArticleItem, AppItem, Platform } from '@components';
import styles from '@styles';
import Reclassify from './components/Reclassify';
import ReclassifyLast from './components/ReclassifyLast';
import { http } from '@services';

@withNavigation
export default class SubCategory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemCategory: [],
		};
	}
	render() {
		let httpUrl = Platform.OS !== 'ios' ? `/services/app/v1/application/classify/${this.props.navigation.state.params.classifyId}` : `/services/app/v1/article/list/classify/${this.props.navigation.state.params.classifyId}`;

		let _renderItem = Platform.OS !== 'ios' ? this.renderItemAndroid : this.renderItemIos;

		if (!this.state.itemCategory)
			return null;
		return (
			<View style={style.subCategoryWrap} >
				<Nav title={this.props.navigation.state.params.classifyName}
					rightComponent={this.headerRightSearch()} />
				{/* <AnimatedFlowList
				renderItem={this.renderItem}
				renderHeader={this.reclassify}
				request={`/services/app/v1/application/classify/${this.props.navigation.state.params.classifyId}`}
				/> */}
				<FlowList
					disabledRefresh
					renderItem={ _renderItem }
					ListHeaderComponent={this.reclassify}
					request={httpUrl} 
					// request={}
				/>
			</View>
		);
	}

	// 展示应用列表
	renderItemAndroid = ({ item }) => {
		return (
			<View style={style.appItem}	 key={item.id}>
				<AppItem
					data={item}
					selected={(item) => { this.toAppDetail(item.id); }}
				/>
			</View>	
		);	
	}
	
	toAppDetail = (id) => {
		this.props.navigation.navigate('App', { id });
	}

	// 展示文章列表
	renderItemIos = ({ item }) => {  
		return (
			<View style={style.appItem} key={item.id}>
				<ArticleItem
					data={item}
					foot={null}
				/>
			</View>
		);
	}

	// 获取分类数据
	getReclassifyData = async () => {
		let { lastStageFlag, classifyId } = this.props.navigation.state.params;
		if (lastStageFlag) {  // 是否为末级分类 0是,1否
			let resClassify = await http(`/services/app/v1/classify/classify/${classifyId}`);  // 二级分类
			let itemCategory = resClassify.data.data;
			this.setState({ itemCategory });
		} else {
			let resClassifyLast = await http(`/services/app/v1/classify/classifyLabel/${classifyId}`);  // 末级分类标签
			let itemCategory = resClassifyLast.data.data;
			this.setState({ itemCategory });
		}
	}

	componentDidMount() {
		this.getReclassifyData();
	}

	headerRightSearch = () => {
		return (
			<Right>
				<Button onPress={() => this.props.navigation.navigate('SearchScreen')} transparent dark>
					<YIcon name="search" style={style.search} />
				</Button>
			</Right>
		);
	}

	// 二级分类和末级分类
	reclassify = () => {
		if (this.props.navigation.state.params.lastStageFlag) {
			return (<Reclassify itemCategory={this.state.itemCategory} />);
		} else {
			return (<ReclassifyLast itemCategory={this.state.itemCategory} />);
		}
	}
}

const style = StyleSheet.create({
	subCategoryWrap: {
		flex: 1,
		backgroundColor: '#f7f9fb',
	},
	search: {
		textAlign: 'left',
		fontSize: styles.transformSize(49),
		color: styles.textSecondaryColor,
		paddingHorizontal: styles.transformSize(50),
	},
	appItem: {
		marginBottom: styles.transformSize(15),
	}
});