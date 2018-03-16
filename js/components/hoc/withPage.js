import React from 'react';
import PropTypes from 'prop-types';
import { View, Alert, FlatList, ActivityIndicator, AsyncStorage, StyleSheet, Dimensions, RefreshControl, LayoutAnimation } from 'react-native';
import {
	Text,
	Image,
	Message,
} from '../';
import { http } from '../../services';
import { cache} from '@utils';
import qs from 'qs';
import styles from '@styles';
import noMoreIcon from '@assets/images/no-more-1.gif';
import {Constants } from '@ydk';
function withPage(WrappedComponent) {
	class WithPage extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				refreshing: false,
				data: [],
				pageNo: 1,
				noMoreData: false,
				hasLoadData: false,
				endTipVisible: true
			};
		}
		static defaultProps = {
			fetchData: null,
			pageSize: 20,
			disabledPage: false,
			enableCacheFirstPage: false,
			disabledRefresh: false,
		}

		componentDidMount() {

			this._isMounted = true;
			this.handleRefresh({refreshing: false});
		}
		componentWillUnmount() {
			this._isMounted = false;

		}
		componentWillReceiveProps(nextProps) {
			if (nextProps.request != this.props.request) {
				this.handleRefresh();
			}
			return false;
		}
		_parseRes = (res) => {
			if (!res)
				return [];
			if (Array.isArray(res))
				return res;
			let data = res.data.data;
			if (data === null)
				return [];
			if (Array.isArray(data.data))
				return data.data;
			if (Array.isArray(data.entities))
				return data.entities;
			if (Array.isArray(data))
				return data;
			console.warn('数据无法识别', data);

		}

		_afterFetchData = (res, cacheType) => {
			let results = this._parseRes(res);
			let { data } = this.state;
			let { pageSize, disabledPage, onFetchedData } = this.props;
			let { pageNo } = this.state;
			if (pageNo === 1) {
				data = results;
			} else {
				data = [...data, ...results];
			}
			let noMoreData = disabledPage || results.length === 0 || pageSize > results.length;
			if (cacheType !== 'fromcache') {
				pageNo++;
				this.isLoading = false;
			}

			this._isMounted && this.setState({
				data,
				refreshing: false,
				pageNo,
				noMoreData,
				hasLoadData: true
			}, () => {
				onFetchedData && onFetchedData(data, res);

			});

		}
		_fetchData = async () => {
			if (this.isLoading)
				return;
			this.isLoading = true;
			let { request, pageSize, disabledPage, enableCacheFirstPage } = this.props;
			let { data, refreshing, pageNo, noMoreData } = this.state;
			if (!request) {
				this.setState({ refreshing: false });
				this.isLoading = false;
				return;
			}
			if (typeof request === 'function') {
				request = request(pageNo, pageSize);
			} else {
				if (typeof request === 'string') {
					request = { url: request };
				}

				if (!disabledPage) {
					request = Object.assign({}, request, {
						url: `${request.url}/${pageNo}/${pageSize}`
					});
				}
			}
			try {
				if (enableCacheFirstPage && pageNo === 1) {
					await cache(request, this._afterFetchData);
				} else {
					let res = await http(request);
					this._afterFetchData(res);
				}

			} catch (res) {
				this.isLoading = false;
				console.warn('请求出错，request url:' + Constants.httpBaseUrl + request.url, res);
				this._isMounted && this.setState({ refreshing: false, noMoreData: true, hasLoadData: true });
			}
		}

		handleRefresh = (state = {}) => {
			if (this.isLoading)
				return;
			let newState = {
				refreshing: true,
				pageNo: 1,
				noMoreData: false, ...state
			};
			this._timetick = new Date();

			this.setState(newState, this._fetchData);
			this.props.onRefresh && this.props.onRefresh();
		}

		handleLoadMore = () => {
			if (this.isLoading)
				return;
			if (!this.state.noMoreData)
				this._fetchData();
		}
		keyExtractor = (item, i) => {
			return this._timetick + i;
		}
		setNativeProps(props) {
			this._root.setNativeProps(props);
		}

		ListFooterComponent = () => {
			let { noMoreData, hasLoadData, data, refreshing} = this.state;
			let { request } = this.props;
			if (!request)
				return null;
			if (hasLoadData && data.length === 0) {
				return <Message type="no-data" />;
			}
			if (hasLoadData && noMoreData) {
				return this.renderEndTip();
			}
			if (refreshing) {
				return null;
			}
			return (
				<View style={{ paddingVertical: 20 }}>
					<ActivityIndicator animating size="large" />
				</View>
			);
		}
		// onEndReachedThreshold 没有作用，自行根据可见元素的变化加载更多
		handleViewableItemsChanged = (e) => {
			let { viewableItems = [] } = e;
			if (viewableItems.length == 0) return;
			let lastVisibleItem = viewableItems[viewableItems.length - 1];
			if (lastVisibleItem.index + this.props.pageSize / 2 > this.state.data.length) {
				this.handleLoadMore();
			}
		}
		render() {
			let { data, refreshing} = this.state;
			let { fetchData, pageSize, disabledRefresh, onRefresh,
				enableCacheFirstPage, ...otherProps } = this.props;
			let	ListFooterComponent = this.ListFooterComponent();
			return <WrappedComponent
				{...otherProps}
				refreshing={refreshing}
				ref={(e) => this._root = e}
				data={data}
				keyExtractor={this.keyExtractor}
				ListFooterComponent={ListFooterComponent}
				refreshControl={this.renderRefreshControl()}
				onEndReached={this.handleLoadMore}
				onViewableItemsChanged={this.handleViewableItemsChanged}
			/>;
		}
		renderRefreshControl = () => {
			if (this.props.disabledRefresh) {
				return null;
			}
			let { refreshControlOptions = { title: "下拉获取更多内容" } } = this.props;
			let  {refreshing} = this.state;
			let handleRefresh = this.handleRefresh;
			return <RefreshControl
				{...refreshControlOptions}
				refreshing={refreshing}
				onRefresh={handleRefresh}
				 />;
		};

		renderEndTip = () => {
			return this.state.endTipVisible ? (
				<View
					onLayout={this.handleEndTipLayout}
					ref={element => this.endTip = element}
					style={s.endTip}
				>
					<Image source={noMoreIcon} style={s.endTipIcon} />
					<Text style={s.endTipText}>已经到底啦，小悠正努力添加内容</Text>
				</View>
			) : null;
		};
		handleEndTipLayout = (e) => {
			this.endTip.measureInWindow((x, y, width, height) => {
				if (y <= Dimensions.get('window').height - height) {
					setTimeout(() => {
						LayoutAnimation.easeInEaseOut();
						this.setState({
							endTipVisible: false
						});
					}, 2000);
				}
			});
		};

		flowRef = null;
		endTip = null;
	}
	return WithPage;
}


const s = StyleSheet.create({
	endTip: {
		...styles.inlineWrap,
		...styles.centerWrap,
		position: 'absolute',
		left: 0,
		right: 0,
		paddingVertical: 20
	},
	endTipIcon: {
		marginRight: 10
	},
	endTipText: {
		textAlign: 'center',
		color: styles.textAssistColor
	}
});

export default withPage;
