import React, { Component } from 'react';
import { StyleSheet, Container, Nav, SearchBar, Tabs, Tab, Keyboard } from '@components';
import styles from '@styles';
import { http } from '@services';
import HotSearch from './HotSearch';

import SearchHistory from './SearchHistory';
import { connect } from 'react-redux';
import { cache } from '@utils'; 
import searchTab from './searchTab';
@connect()
export default class SearchScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyWords: '',
			showHistory: false,
			showHot: true,
			wordsHolder: '',
		};
	}
	render() {
		// let { params = '' } = this.props.navigation.state;
		let { wordsHolder = '' } = this.state;
		// let rightDom = <Touchable onPress={this.handleSearch}><Text>搜索</Text></Touchable>;
		let bodyDom = <SearchBar onSearch={this.handleSearch} placeholder={wordsHolder} onFocus={this.focusSearch}
			onBlur={this.blurSearch} searchText={this.state.keyWords}
			onSearchTxtChange={this.handleSearchTxtChange}
		></SearchBar>;
		return (
			<Container>
				<Nav bodyComponent={bodyDom} hideRight></Nav>
				{this.renderBody()}
			</Container>
		);
	}
	renderBody = () => {
		if (this.state.showHistory) {
			return <SearchHistory onHistoryPress={this.pressHistory}></SearchHistory>;
		}
		if (this.state.showHot) {
			return <HotSearch onHotWordPress={this.handleSearch}></HotSearch>;
		}
		return (
			this.renderTabs()
		);
	}
	componentDidMount() {
		cache('/services/app/v1/hotword/list', (res) => {
			let _res = res.data.data;
			let wordsHolder = _res && _res[0].hotword;
			this.setState({ wordsHolder });
		});
	}
	handleSearchTxtChange = (text) => {
		if (!text) {
			this.setState({ showHot: true, showHistory: false, keyWords: '' });
		} else {
			this.setState({ showHot: false, showHistory: true });
		}
	}
	pressHistory = (item) => {
		this.setState({ keyWords: item, showHistory: false, showHot: false });
	}
	focusSearch = () => {
		this.setState({
			showHistory: true,
		});
	}
	blurSearch = () => {
		this.setState({
			showHistory: false,
		}, Keyboard.dismiss());
	}
	handleSearch = (words) => {
		// let { params = '' } = this.props.navigation.state;
		// let defaultWords = params.split(' ')[0];
		let { wordsHolder = '' } = this.state;

		words = words.trim() !== '' ? words : wordsHolder;
		if (words === this.state.keyWords) {
			// Toast.show({text: '已经是您要的搜索结果啦'});
			return;
		}
		this.saveHotword(words);
		this.setState({ keyWords: words, showHot: false, showHistory: false });
		
	}
	// 保存新增关键字
	saveHotword = (hotword) => {
		this.props.dispatch({ type: 'ADD_HISTORY', payload: { keyword: hotword}});
		http({
			url: `/services/app/v1/hotword/addUserSearchword/${hotword}`,
			method: 'put'
		}).then((res) => {
			if (res.data.code !== '200') {
				console.warn('save hotword failed ', hotword);
			}
		});
	}
	renderTab = (catItem) => {
		let { keyWords } = this.state;
		return (
			<Tab heading={catItem.cat} key={catItem.cat} tabStyle={searchStyle.tabWrap} activeTextStyle={searchStyle.tabWrap}>
				<catItem.tabComp keyWords={keyWords} ></catItem.tabComp >
			</Tab>
		);
	}
	renderTabs = () => {
		let { keyWords } = this.state;
		if (!keyWords)
			return null;
		return (
			<Tabs tabContainerStyle={searchStyle.tabBars}>
				{searchTab.map(this.renderTab)}
			</Tabs>
		);
	}

}
const searchStyle = StyleSheet.create({
	tabBars: {
		borderBottomWidth: 0,
		height: styles.transformSize(132),
	},
	tabWrap: {
		paddingTop: styles.transformSize(48),
		paddingBottom: styles.transformSize(22),
	}

});