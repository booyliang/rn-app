import React, { Component } from 'react';
import { StyleSheet, ScrollView, Container, View, NoResult, withNavigation, Panel, AppItem, MorePanel, Loading } from '../../components';
import styles from '../../styles';
import { http } from '../../services';
import AnimatedFlowList from '../../components/containers/AnimatedFlowList';
import { YZhugeIo } from '@ydk';
@withNavigation
export default class SearchApp extends Component {
	state = {
		matchedApps: [],
		relatedApps: [],
		// recommendApps: [],
		getRequest: this.getRequest.bind(this),
		showRecommend: false,
		isLoading: true,
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.keyWords !== this.props.keyWords) {
			this.setState(
				{
					getRequest: this.getRequest.bind(this),
					isLoading: true,
				},
				this.fetchAppData
			);
		}
	}

	render() {
		if (this.state.isLoading) {
			return <Loading />;
		}
		return (
			<Container>
				{!this.state.showRecommend &&
					<ScrollView keyboardDismissMode="on-drag">
						{this.renderMatchedApps()}
						{this.renderRelatedApps()}
					</ScrollView>
				}
				{this.state.showRecommend && this.renderRecommendApps()}
			</Container>
		);
	}

	renderMatchedApps = () => {
		YZhugeIo.track('搜索_应用', {
			// 'userId': ''
		});

		let { matchedApps = [] } = this.state;

		let appResult = `找到以下应用`;
		let url = `/services/app/v1/es/app/list/0`;
		if (matchedApps.length) {
			return (
				<MorePanel title={appResult} getMore={this.getMoreApp(url)} hasMore={matchedApps.length > 6}>
					{matchedApps.slice(0, 6).map(this.renderItem)}
				</MorePanel>
			);
		}
		return null;
	}

	renderRelatedApps = () => {
		let { keyWords } = this.props;
		let { relatedApps = [] } = this.state;
		if (!relatedApps.length) {
			return null;
		}
		let likeAppRet = `找到以下与“${keyWords}”相关应用`;
		let url = `/services/app/v1/es/app/list/1`;

		return (
			<MorePanel title={likeAppRet} getMore={this.getMoreApp(url)} hasMore={relatedApps.length > 6}
				style={style.related}>
				{relatedApps.slice(0, 6).map(this.renderItem)}
				{/* <FlatList data={relatedApps}
					renderItem={this.renderItem}></FlatList>*/}
			</MorePanel>
		);
	}

	renderRecommendApps = () => {
		let { keyWords } = this.props;
		return (
			<AnimatedFlowList keyboardDismissMode="on-drag"
				disabledRefresh
				headerHeight={styles.transformSize(340)}
				maxScrollHeaderHeight={styles.transformSize(200)}
				renderHeader={() => {
					return (
						<View>
							<NoResult comments={`没有找到与“${keyWords}”相关的应用`} />
							<Panel />
						</View>
					);

				} } request="/services/app/v1/application/list" renderItem={this.renderRecommendItem}
			/>
		);
	}

	componentDidMount() {
		this.fetchAppData();
	}

	getRequest(url, scrollId) {
		let { keyWords } = this.props;
		if (!keyWords) {
			return;
		}
		return {
			url,
			params: {
				keyWord: keyWords,
				pageSize: 10,
				scrollId,
			}
		};
	}
	fetchAppData = async () => {
		let req4Matched = this.getRequest(`/services/app/v1/es/app/list/0`);
		let req4Related = this.getRequest(`/services/app/v1/es/app/list/1`);
		if (!req4Matched || !req4Related) {
			return;
		}
		let res = await Promise.all([
			http(req4Matched),
			http(req4Related),
		]);
		let matchedApps = res[0].data.data.data || [];

		let relatedApps = res[1].data.data.data || [];

		if (matchedApps.length || relatedApps.length) {
			this.setState({ showRecommend: false, matchedApps, relatedApps, isLoading: false });
		} else {
			this.setState({ showRecommend: true, matchedApps, relatedApps, isLoading: false });
		}

	}
	fetchRecommendApp = async () => {
		let request = `/services/app/v1/application/list/1/6`;
		let res = await http(request);
		this.setState({
			recommendApps: res.data.data.entities,
			loading: false,
		});
	}

	renderItem = (item) => {
		if (item.labelName) {
			let itemArr = item.labelName.split(',');
			let desp = item.labelDesp.split(",");
			let labels = [];
			itemArr.map((item, index) => {
				let temp = {};
				temp.labelName = item;
				temp.id = desp[index];
				labels.push(temp);
			});
			item.labels = labels;
		} else {
			item.labels = [];
		}

		// console.log(item.labels);
		return (
			<AppItem data={item} key={item.id} selected={this.toAppDetail(item.id)} bottomLine></AppItem>
		);
	}
	renderRecommendItem = ({ item }) => {
		return (
			<AppItem data={item} key={item.id} selected={this.toAppDetail(item.id)} bottomLine></AppItem>
		);
	}

	getMoreApp = (url) => () => {
		let { navigation, keyWords } = this.props;
		navigation.navigate('AppList', { url, keyWords });
	}

	toAppDetail = (id) => () => {
		if (!id) {
			console.warn('app id is undefined');
			return;
		}
		this.props.navigation.navigate('App', { id });
	}
}

const style = StyleSheet.create({
	related: {
		marginTop: styles.transformSize(30),
	}


});