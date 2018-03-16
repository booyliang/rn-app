import React, { Component } from 'react';
import { Container, View, Text, withNavigation, Panel, FlowList, StyleSheet } from '@components';
import styles from '@styles';
import AnimatedFlowList from '@components/containers/AnimatedFlowList';
@withNavigation
export default class CommonSearch extends Component {
	state = {
		relatedList: [],
		recommendList: [],
		showRecommend: false,
		noMoreComp: <View style={{ paddingVertical: 20 }}>
			<Text style={{ textAlign: 'center' }}>没有更多了...</Text>
		</View >,
		// 函数props改变 Flowlist无法监听到， 将函数设置在state中，触发重新渲染
		getRelatedRequest: this.getRelatedRequest.bind(this),
	}
	scrollId = ""
	componentWillReceiveProps(nextProp) {
		if (this.props.keyWords !== nextProp.keyWords) {
			this.setState({
				getRelatedRequest: this.getRelatedRequest.bind(this),
				showRecommend: false,
			});
		}
	}
	render() {
		return (
			<Container>
				{this.renderRelatedList()}
				{this.state.showRecommend && this.renderRecommendList()}
			</Container>

		);
	}

	// 匹配到的 
	renderRelatedList = () => {
		
		if (this.state.showRecommend) {
			return null;
		}
		return (
			// <ScrollView>
			<FlowList request={this.state.getRelatedRequest} renderItem={this.props.renderItem}
				onFetchedData={this.handleFetchedData}
				pageSize={10}
				NoMoreDataComponent={this.state.noMoreComp}
				keyboardDismissMode="on-drag"

			/>
			// </ScrollView>
		);
	}

	// 推荐的
	renderRecommendList = () => {
		let { EmptyComponent } = this.props;
		return (
			// <ScrollView stickyHeaderIndices={[1]} keyboardDismissMode="on-drag">
			// 	{EmptyComponent}
			// 	<Panel></Panel>
			// 	<FlowList request={this.props.recommendRequest} renderItem={this.props.renderItem} />
			// </ScrollView>
			// ScrollView嵌套ScrollView导致触发底部加载所有页数据
			<AnimatedFlowList keyboardDismissMode="on-drag"
				disabledRefresh	
				headerHeight={styles.transformSize(340)}
				maxScrollHeaderHeight={styles.transformSize(200)}
				renderHeader={() => {
					return (
						<View>
							{EmptyComponent}
							<Panel />
						</View>
					);
				}} request={this.props.recommendRequest} renderItem={this.props.renderItem}
			/>
		);
	}

	getRelatedRequest(pageNo, pageSize) {
		let { keyWords, relatedRequest } = this.props;
		if (pageNo === 1) {
			this.scrollId = null;
		}
		return {
			url: relatedRequest,
			params: {
				scrollId: this.scrollId,
				keyWord: keyWords,
				pageSize,
			}
		};
	}

	handleFetchedData = (data = [], res) => {
		if (this.props.onFetchedData) {
			this.props.onFetchedData(data, res);
		}
		this.scrollId = res.data && res.data.data && res.data.data.scrollId;
		if (!data.length) {
			this.setState({
				noMoreComp: null,
				showRecommend: true,
			});
		} else {
			this.setState({
				noMoreComp: (<View style={{ paddingVertical: 20 }}>
					<Text style={{ textAlign: 'center' }}>没有更多了...</Text>
				</View >),
				showRecommend: false,
			});
		}
	}
}
