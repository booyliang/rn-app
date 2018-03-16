import React, { Component } from 'react';

import { YIcon, Image, StyleSheet, Touchable, Text, View, withNavigation, Header } from '../../components';
import { transformSize } from '../../styles';
import { http } from '../../services';
import { connect } from 'react-redux';
import { YZhugeIo } from '@ydk';

let mapStateToProps = (state) => {
	return {
		hotWords: state.home.hotWords,
	};
};
@withNavigation
@connect(mapStateToProps)
export default class HomeHeader extends Component {

	render() {
		let { hotWords } = this.props;
		return (
			<Header style={headerStyle.headerWrap}>
				<View style={headerStyle.logoWrap}>
					<Image source={require('@assets/images/logo-new.png')} />
					<Image source={require('@assets/images/yryz.png')} style={headerStyle.logoName} />
				</View>
				<Touchable type="withoutFeedback" onPress={this.gotoSearch} style={headerStyle.touchWrap} >
					<View style={headerStyle.searchBarWrap} >
						<View style={headerStyle.searchInput}>
							<YIcon name="search" style={headerStyle.searchIcon} />
							<Text style={headerStyle.hotword}>{hotWords}</Text>
						</View>
					</View>
				</Touchable>
			</Header>
		);
	}

	gotoSearch = () => {
		let { hotWords } = this.props;
		YZhugeIo.track('首页搜索', {});



		this.props.navigation.navigate('SearchScreen', hotWords);
	}
	componentDidMount() {
		this.fetchHotWords();
	}
	fetchHotWords = async () => {
		let res = await http('/services/app/v1/hotword/list');
		let hotWordsArr = res.data.data;
		// let hotWords = hotWordsArr.reduce((total, curItem, index) => {
		// 	return total + ' ' + curItem.hotword;
		// }, '');
		// hotWords = hotWords.trim();
		let hotWords = hotWordsArr && hotWordsArr[0].hotword;

		return this.props.dispatch({ type: 'LOAD_HOTWORDS', payload: { hotWords } });
	}
}

const headerStyle = StyleSheet.create({
	headerWrap: {
		paddingHorizontal: transformSize(30),
		paddingBottom: transformSize(9),
		// justifyContent: 'flex-end',
		alignItems: 'flex-end',
		borderBottomColor: '#fff',
		borderBottomWidth: 0,
	},
	logoWrap: {
		flexDirection: 'row',
		marginRight: transformSize(42),
		flex: 0,
		marginTop: transformSize(26),
		alignSelf: 'center',
	},
	logoName: {
		marginLeft: transformSize(16),
		marginTop: transformSize(12),
	},
	touchWrap: {
		flex: 1,
	},
	searchBarWrap: {
		height: transformSize(100),
		flexDirection: 'row',
		marginBottom: transformSize(10),
		position: 'relative',
		flex: 1,
	},
	searchInput: {
		flex: 1,
		flexDirection: 'row',
		borderRadius: transformSize(50),
		// fontSize: transformSize(43),
		backgroundColor: '#f3f3f3',
		overflow: 'hidden',
		// textAlign: 'left',
		// lineHeight: transformSize(76), //兼容问题
		paddingVertical: transformSize(20),
		paddingLeft: transformSize(30),
	},
	searchIcon: {
		fontSize: transformSize(34),
		// lineHeight: transformSize(30),
		height: transformSize(50),
		color: '#999',
		paddingRight: transformSize(8),
		paddingTop: transformSize(14),
	},
	hotword: {
		fontSize: transformSize(46),
		color: '#999',
		// lineHeight: transformSize(56),
		marginLeft: transformSize(10),
		alignSelf: 'center',
	}
});