import React from 'react';
import {
	ScrollView,
	Dimensions,
	Toast,
	Platform,
	ViewPagerAndroid,
	Loading,
} from '@components';
import {
	cache
} from '@utils';
import {
	YZhugeIo
} from '@ydk';
import ArticlePage from './components/ArticlePage';
import { View } from 'react-native';
let { width } = Dimensions.get('window');

class Article extends React.Component {
	render() {

		if (Platform.OS === 'ios') {
			return (
				<ScrollView pagingEnabled={true}
					horizontal={true}
					scrollEventThrottle={16}
					removeClippedSubviews={true}
					showsHorizontalScrollIndicator={false}
					onMomentumScrollEnd={this.handleScrollEnd}
					ref={(s) => this._refScrollView = s}
				>
					{this.articleIds.map(this.renderItem)}
				</ScrollView>
			);
		} else {
			if (this.state.artIdIndex === undefined) {
				return <Loading />;
			}
			return (
				<ViewPagerAndroid initialPage={this.state.artIdIndex} style={{ flex: 1 }}
					ref={(s) => this._refScrollView = s}
					key={this.articleIds.length}
					onPageSelected={this.onPageSelected}
					removeClippedSubviews={true}
				>
					{this.articleIds.map(this.renderItem)}

				</ViewPagerAndroid>
			);
		}



	}
	// onPageScroll = (e) => {
	// 	this.handleHorizontalScroll(e);
	// }
	handleHorizontalScroll = (e) => {
		let { articleIds } = this.props.navigation.state.params;
		if (!articleIds) {
			return;
		}
		if (e.nativeEvent.contentSize.width === 0)
			return;
		if (e.nativeEvent.contentOffset.x < -20) {
			return this.props.navigation.goBack();
		}

		if (e.nativeEvent.contentOffset.x + e.nativeEvent.layoutMeasurement.width > e.nativeEvent.contentSize.width + 30) {
			Toast.show('没有更多内容了，小悠正在努力筹备');
		}
	}

	renderItem = (id) => {
		let data = this.state.articles[id];
		// 所有的子视图都必须是纯View，而不能是自定义的复合容器 for ViewPagerAndroid

		return (
			<View key={id} style={{ flex: 1 }}>
				<ArticlePage data={data} onFollowed={this.handleFollowed(id)} />
			</View>
		);
	}
	componentWillMount() {
		let { articleIds, id } = this.props.navigation.state.params;
		this.articleIds = articleIds || [id];
		this.id = id;

	}
	componentDidMount() {
		let idIndex = this.articleIds.indexOf(this.id);
		this.offsetX = width * idIndex;
		if (Platform.OS === 'ios') {
			this._refScrollView.scrollTo({ x: this.offsetX, animated: false });
			requestAnimationFrame(this.checkDataIsLoad);
		} else {
			let artIdIndex = this.articleIds.indexOf(this.id);
			this.setState({ artIdIndex }, () => { requestAnimationFrame(this.checkDataIsLoad); });
		}
	}

	handleFollowed = (id) => () => {
		const articles = this.state.articles;
		const article = articles[id];
		article.articleFollowCount++;
		article.articleFollowFlag = 1;
		this.setState({
			articles
		});
	};

	loadData = (id) => {
		let { articles } = this.state;
		let data = articles[id];
		if (data) {
			return;
		}
		cache(`/services/app/v1/article/${id}`, (res) => {
			let data = res.data.data;
			if (articles[id])
				return;
			articles[id] = data;
			this.setState({
				articles: { ...articles }
			});
		});
	}

	// check 左右item是否已加载
	checkSiblingIsLoad = (idIndex) => {
		let articleIds = this.articleIds;
		let preIdIndex = idIndex - 1;
		let nextIdIndex = idIndex + 1;
		if (preIdIndex >= 0) {
			this.loadData(articleIds[preIdIndex]);
		}
		if (nextIdIndex < articleIds.length) {
			this.loadData(articleIds[nextIdIndex]);
		}
	}

	checkDataIsLoad = () => {
		let articleIds = this.articleIds;
		let idIndex = Platform.OS === 'ios' ? parseInt(this.offsetX / width) : this.state.artIdIndex;
		let id = articleIds[idIndex];
		this.artId = id;
		let { articles } = this.state;
		let data = articles[id];

		if (data) {
			YZhugeIo.track('文章打开', {
				'文章标题': data.article.title,
			});
			// return this.setState({ data }, () => {this.checkSiblingIsLoad(idIndex); })
			this.checkSiblingIsLoad(idIndex);
			return;
		}
		cache(`/services/app/v1/article/${id}`, (res) => {
			let data = res.data.data;
			articles[id] = data;
			YZhugeIo.track('文章打开', {
				'文章标题': data.article.title,
			});
			this.setState({
				articles
			}, () => { this.checkSiblingIsLoad(idIndex); });
		});
	}

	handleScrollEnd = (e) => {

		this.offsetX = e.nativeEvent.contentOffset.x;
		this.checkDataIsLoad();
	}
	onPageSelected = (e) => {
		let artIdIndex = e.nativeEvent.position || 0;
		this.setState({ artIdIndex }, () => {
			this.checkDataIsLoad();
		});

	}

	state = {
		articles: {},
	};
}

export default Article;