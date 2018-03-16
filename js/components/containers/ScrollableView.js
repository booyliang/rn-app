/**
 *author: AiQingmin
 *function: Horizontal Scrollable View especially for detail page
 */
import React, { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from '../hoc';
import { Toast } from '../base';
import { cache } from '@utils';
let { width } = Dimensions.get('window');
@withNavigation
export default class ScrollableView extends Component {
	constructor(props) {
		super(props),
		this.scrollIds = this.props.scrollIds || [this.props.id];
		this.id = this.props.id;
	}
	static propTypes = {
		scrollIds: PropTypes.array,
		track: PropTypes.func,
		renderItem: PropTypes.func,
		detailApi: PropTypes.func,
	}
	static defaultProps = {

	}
	state = {
		scrollItems: {},
	}

	render() {
		let { scrollItems } = this.state;
		this.props.getScrollItems(scrollItems);
		return (
			<ScrollView pagingEnabled={true}
				horizontal={true}
				scrollEventThrottle={16}
				removeClippedSubviews={true}
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={this.handleScrollEnd}
				ref={(s) => this._refScrollView = s}
				onScroll={this.handleHorizontalScroll}
			>
				{this.scrollIds.map(this.props.renderItem)}
			</ScrollView>
		);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.scrollIds !== nextProps.scrollIds) {
			let { scrollIds, id } = nextProps;
			this.scrollIds = scrollIds || [id];
			this.id = id;
		}
	}

	componentDidMount() {
		let idIndex = this.scrollIds.indexOf(this.id);
		this.offsetX = width * idIndex;
		this._refScrollView.scrollTo({ x: this.offsetX, animated: false });
		window.requestAnimationFrame(this.checkDataIsLoad);
	}
	handleScrollEnd = (e) => {
		this.offsetX = e.nativeEvent.contentOffset.x;
		this.checkDataIsLoad();
	}
	getDetailApi = (id) => {
		if (this.props.detailApi) {
			return this.props.detailApi(id);
		}
		return `/services/app/v1/article/${id}`;
	}
	checkDataIsLoad = () => {

		let idIndex = parseInt(this.offsetX / width);
		let id = this.scrollIds[idIndex];
		let { scrollItems } = this.state;
		let data = scrollItems[id];
		let detailPageApi = this.getDetailApi(id);
		if (data) {
			// YZhugeIo.track('打开文章', {
			// 	'文章标题': data.article.title,
			// })
			this.props.track && this.props.track(data);
			return this.setState({ data }, () => { this.checkSiblingIsLoad(idIndex); });
		}
		cache(detailPageApi, (res) => {
			let data = res.data.data;
			scrollItems[id] = data;
			this.props.track && this.props.track(data);
			this.setState({
				scrollItems, data
			}, () => { this.checkSiblingIsLoad(idIndex); });
		});

	}
	// check 左右item是否已加载
	checkSiblingIsLoad = (idIndex) => {
		let scrollIds = this.scrollIds;
		let preIdIndex = idIndex - 1;
		let nextIdIndex = idIndex + 1;
		if (preIdIndex >= 0) {
			this.loadData(scrollIds[preIdIndex]);
		}
		if (nextIdIndex < scrollIds.length) {
			this.loadData(scrollIds[nextIdIndex]);
		}
	}
	loadData = (id) => {
		let { scrollItems } = this.state;
		let data = scrollItems[id];
		let detailPageApi = this.getDetailApi(id);
		if (data) {
			return;
		}
		cache(detailPageApi, (res) => {
			let data = res.data.data;
			if (scrollItems[id])
				return;
			scrollItems[id] = data;
			this.setState({
				scrollItems: { ...scrollItems }
			});
		});
	}
	handleHorizontalScroll = (e) => {
		let { scrollIds } = this.props;
		if (!scrollIds) {
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
}