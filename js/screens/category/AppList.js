
import React, { Component } from 'react';
import { Container, View, Nav, YIcon, withNavigation, FlowList, StyleSheet } from '@components';
import { transformSize, iconSize, textSecondaryColor } from '@styles';
import { AppItem } from './../../components/containers';
@withNavigation
export default class AppList extends Component {
	constructor(props) {
		super(props);
		this.searchParams = this.props.navigation.state.params;
	}

	headerRight() {
		return (
			<View style={decorate.searchBox}>
				<YIcon name="search" style={decorate.search} onPress={() => this.props.navigation.navigate('SearchScreen')} />
			</View>
		);
	}

	customRequest(pageNo, pageSize) {
		let { url, keyWords, scrollId } = this.searchParams;
		if (pageNo === 1) {
			scrollId = "";
		}
		return {
			url,
			params: {
				keyWord: keyWords,
				pageSize,
				scrollId
			}
		};
	}

	onSelect(item) {
		this.props.navigation.navigate('App', item.id);
	}

	onSelectTag(label) {
		this.props.navigation.navigate("TagPage", label);
	}

	async coustomFetchData(data, res) {
		data = res.data;
		if (data.code === "200") {
			this.searchParams.scrollId = data.data.scrollId;
			return data.data.data;
		}
		throw data.msg;
	}

	render() {
		return (
			<Container>
				<Nav title={this.searchParams.keyWords} rightComponent={this.headerRight()}></Nav>
				<FlowList
					noMoreData={true}
					pageSize={10}
					renderItem={({ item }) => <AppItem data={item} selected={this.onSelect.bind(this)} />
					}
					request={this.customRequest.bind(this)}
					ItemSeparatorComponent={() => <View style={decorate.segmentation}></View>}
					onFetchedData={this.coustomFetchData.bind(this)}
				/>
			</Container>
		);
	}
}

const decorate = StyleSheet.create({
	wrapper: {
		backgroundColor: '#f7f9fb'
	},
	segmentation: {
		height: transformSize(18),
		backgroundColor: '#f7f9fb'
	},
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: 'center'
	},
	searchBox: {
		width: transformSize(100),
		paddingRight: transformSize(40)
	},
	search: {
		fontSize: iconSize,
		color: textSecondaryColor,
		textAlign: 'right',
	}
});