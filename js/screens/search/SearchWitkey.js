import React, { Component } from 'react';
import { withNavigation, WitkeyItem, Container, MorePanel } from '../../components';
import CommonSearch from './components/CommonSearch';
import { YZhugeIo } from '@ydk';
import { cache } from './../../utils';
@withNavigation
export default class SearchWitkey extends React.PureComponent {

	state = {
		matchData: []
	};

	render() {
		YZhugeIo.track('搜索_威客', {
			// 'userId': ''
		});

		return (
			<Container>
				{this.renderBody()}
			</Container>
		);
	}

	matchSearch() {
		let relatedReq = '/services/app/v1/es/witkey/list/0';
		let { keyWords } = this.props;
		let requestParams = {
			url: relatedReq,
			params: {
				// scrollId: this.scrollId,
				keyWord: keyWords,
				pageSize: 10,
			}
		};
		cache(requestParams, (res) => {
			this.setState({
				matchData: res.data.data.data
			});
		});
	}

	componentDidMount() {
		this.matchSearch();
	}

	renderBody() {
		const { matchData } = this.state;
		let relatedReq = '/services/app/v1/es/witkey/list/0';
		let emptyComp = <NoResult comments={`没有找到与“${this.props.keyWords}”相关的威客`} />;
		if (matchData.length < 6) {
			return (
				<CommonSearch
					{...this.props}
					relatedRequest={relatedReq}
					recommendRequest={this.getRecommendRequest}
					renderItem={this.renderItem}
					EmptyComponent={emptyComp}
				></CommonSearch>
			);
		}

		return (
			<MorePanel title={"找到以下威客"} hasMore={true} getMore={this.getMore.bind(this)}>
				{matchData.slice(0, 6).map(this.renderItem)}
			</MorePanel>
		);

	}

	getMore() {
		this.props.navigation.navigate("WitkeyHome");
	}

	getRecommendRequest = (pageNo, pageSize) => {
		let recommendReq = `/services/app/v1/witkey/findWitkeys/${pageNo}/${pageSize}`;
		return {
			url: recommendReq,
			method: 'GET',
			params: {
				delFlag: 0,
				shelveFlag: 0
			}
		};
	}

	renderItem = (item) => {
		item = item.item || item;
		return (
			<WitkeyItem data={item} key={item.id} selected={this.handleWitkeyPress(item)} bottomLine></WitkeyItem>
		);
	}

	handleWitkeyPress = (item) => () => {
		let { navigation } = this.props;
		navigation.navigate('WitkeyDetail', { id: item.id });
		YZhugeIo.track('威客名称', {
			威客名称: item.companyName
		});
		YZhugeIo.track('猜你喜欢', {
			'威客名称': item.companyName,
		});
	}
}