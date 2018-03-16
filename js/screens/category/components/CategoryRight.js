import React, { Component } from 'react';
import { StyleSheet, TagGroup, Tag, FlowList, withNavigation, View, Platform, ArticleItem } from '@components';
import styles from '@styles';
import { cache } from '@utils';
import { YZhugeIo } from '@ydk';
import CategoryAppItem from './CategoryAppItem';
@withNavigation
export default class CategoryRight extends Component {
	state = {
		subclassification: [],
		loading: true,
	}

	render() {
		let { subclassification, loading } = this.state;
		let { currSubClassifiId } = this.props;
		if (loading) {   // 当没有渲染出来子分类id时返回空, 不渲染右边内容
			return null;
		}

		let httpUrl = Platform.OS !== 'ios' ? `/services/app/v1/application/classify/${currSubClassifiId}` : `/services/app/v1/article/list/classify/${currSubClassifiId}`;

		let _renderItem = Platform.OS !== 'ios' ? this.renderAndroid : this.renderIos;

		return (
			<View style={{ backgroundColor: '#fff', flex: 1, }}>
				<TagGroup style={style.topContent}>
					{subclassification.map(this.subclassify)}
				</TagGroup>
				<FlowList
					disableRefresh={true}
					renderItem={_renderItem}
					request={httpUrl}
					enableCacheFirstPage={true}
					ItemSeparatorComponent={() => <View style={style.line}></View>}
				/>
			</View>
		);
	}

	componentDidMount() {
		if (this.props.currSubClassifiId ) {
			this.getSubclass();
		}
	}

	renderAndroid = ({ item }) => {
		return <CategoryAppItem data={item} />;
	}

	renderIos = ({item}) => {
		return (
			<ArticleItem
				data={item}
				foot={null}
				imageStyle={style.image}
			/>
		);
	}

	// 获取所有子分类数据
	getSubclass = () => {
		let { currSubClassifiId } = this.props;
		if (!currSubClassifiId) return;
		cache(`/services/app/v1/classify/classify/${currSubClassifiId}`, (res) => {
			let subclassification = res.data.data;
			this.setState({
				subclassification, loading: false
			});
		});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.currSubClassifiId !== this.props.currSubClassifiId) {
			this.setState({ loading: true }, this.getSubclass);
		}
		return false;
	}

	subclassify = (item) => {
		return (
			<Tag
				style={style.tagItem}
				key={item.id}
				onPress={() => this.tagPress(item)}>{item.classifyName}</Tag>
		);
	}

	tagPress(item) {
		// 埋点
		YZhugeIo.track('子分类名称', {
			"子分类名称": item.classifyName
		});

		this.props.navigation.navigate('SubCategory', {  // 路由传参
			classifyId: item.id,
			classifyName: item.classifyName,
			lastStageFlag: item.lastStageFlag,
			classifyIcon: item.icon
		});
	}

}

const style = StyleSheet.create({
	topContent: {
		flexWrap: 'wrap',
		paddingHorizontal: styles.transformSize(24),
		paddingTop: styles.transformSize(36),
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: styles.borderColor,
	},
	tagItem: {
		width: '27.5%',
		height: styles.transformSize(100),
		marginRight: 0,
		paddingVertical: styles.transformSize(21),
		marginHorizontal: '2.9%',
		marginBottom: styles.transformSize(36),
		textAlign: 'center',
		backgroundColor: 'transparent',
		color: styles.themeColor,
		fontSize: styles.transformSize(45),
		...styles.border,
		borderColor: styles.themeColor,
		borderRadius: styles.transformSize(15),
		borderWidth: styles.transformSize(3),
	},
	line: {
		...styles.borderBottom,
		marginHorizontal: styles.transformSize(45),
	},
	image: {
		height: styles.transformSize(378)
	}
});