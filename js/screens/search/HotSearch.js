import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Tag, TagGroup, Panel, withNavigation } from '@components';
import styles from '@styles';
import SearchTag from './components/SearchTag';
import { YZhugeIo } from '@ydk';
import { cache } from '@utils';
@withNavigation
export default class SearchScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hotWordsArr: [],
			hotLabelArr: [],
		};
	}
	render() {
		return (
			<ScrollView style={searchStyle.backWrap} keyboardDismissMode='on-drag' >
				{this.renderHotSearch()}
				{this.renderHotLabel()}
			</ScrollView>
		);
	}
	componentDidMount() {
		this.fetchHotWords();
	}
	fetchHotWords = () => {
		// let res = await Promise.all(
		// 	[
		// 		http('/services/app/v1/hotword/list'),
		// 		http('/services/app/v1/label/hotLabel')
		// 	]);
		// let hotWordsArr = res[0].data.data;
		// let hotLabelArr = res[1].data.data;
		cache('/services/app/v1/hotword/list', (res) => {
			let hotWordsArr = res.data.data;
			this.setState({ hotWordsArr });
		});
		cache('/services/app/v1/label/hotLabel', (res) => {
			let hotLabelArr = res.data.data;
			this.setState({ hotLabelArr });
		});

	}
	renderHotSearch = () => {
		if (!this.state.hotWordsArr.length) {
			return null;
		}
		let searchTags = [];
		this.state.hotWordsArr.map((item, index) => {
			searchTags.push(<SearchTag label={item.hotword} index={index + 1} key={index} onPress={this.touchHotWrods(item)} />);
		});
		return (
			<View style={searchStyle.hotWrap}>
				<Panel title="热门搜索" style={searchStyle.panel}></Panel>
				<View style={[searchStyle.searchTags, { marginLeft: styles.transformSize(24) }]}>{searchTags}</View>
			</View>
		);
	}
	renderHotLabel = () => {
		if (!this.state.hotLabelArr.length) {
			return null;
		}
		let hotLabels = [];
		this.state.hotLabelArr.map((item, index) => {
			hotLabels.push(<Tag key={index} onPress={this.touchHotLabel(item)} style={searchStyle.hotLabel}>{item.labelName}</Tag>);
		});
		return (
			<View style={[searchStyle.hotWrap, searchStyle.hotLabelWrap]}>
				<Panel title="热门标签" style={searchStyle.panel}></Panel>
				<TagGroup style={searchStyle.searchTags}>{hotLabels}</TagGroup>
			</View>
		);
	}
	touchHotLabel = (item) => () => {
		this.props.navigation.navigate('TagPage', {
			tagId: item.id
		});
		YZhugeIo.track('热门标签', {
			热门标签文字: item.labelName
		});
	}
	touchHotWrods = (item) => () => {
		this.props.onHotWordPress && this.props.onHotWordPress(item.hotword);
		YZhugeIo.track('热门搜索', {
			热门搜索文字: item.hotword
		});
	}

}
const searchStyle = StyleSheet.create({
	backWrap: {
		backgroundColor: '#fff',
	},
	searchTags: {
		...styles.inlineWrap,
		// width: '90%',
		flexWrap: 'wrap',
	},
	hotWrap: {
		...styles.padder,
		backgroundColor: '#fff',
	},
	hotLabelWrap: {
		marginTop: styles.transformSize(-16),
	},
	hotLabel: {
		paddingHorizontal: styles.transformSize(51),
		paddingVertical: styles.transformSize(30),
		backgroundColor: '#f8f8f8',
		color: '#666',
		marginRight: styles.transformSize(26),
		marginBottom: styles.transformSize(26),
	},
	panel: {
		borderBottomWidth: 0,
		paddingLeft: 0,
	}
});