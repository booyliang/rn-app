import React, { Component } from 'react';
import {PixelRatio} from 'react-native';
import {
	Container, View, StyleSheet, Nav,
	withNavigation, WitkeyItem, FlowList, Platform
} from '@components';
import { transformSize } from '../../styles';
import { YZhugeIo } from '@ydk';
import SearchIcon from './components/SearchIcon';
@withNavigation
export default class Witkey extends Component {

	_requestParams(pageNo, pageSize) {
		return {
			url: `/services/app/v1/witkey/findWitkeys/${pageNo}/${pageSize}`,
			params: { shelveFlag: 0 }
		};
	}

	render() {
		YZhugeIo.track('发现-威客', {

		});
		return (
			<Container style={styles.container}>
				{/* {this.showNav()}	 */}
				<FlowList
					request={this._requestParams}
					enableCacheFirstPage={true}
					renderItem={({ item }) => <WitkeyItem data={item} selected={(item) => this.onSelected(item)}/>}
					ItemSeparatorComponent={() => <View style={styles.segmentation}></View>}
					ref={(r) => {this._refWitkeyFlow = r; }}
				/>
			</Container>
		);
	}
	showNav = () => {
		if (Platform.OS !== 'ios') {
			return (
				<Nav hideLeftIcon={true} title="威客" rightComponent={<SearchIcon />}></Nav>
			);
		}
	}
	onSelected(item) {
		let witkeyList = this._refWitkeyFlow.state.data;
		let scrollIds = witkeyList.map((item) => item.id);
		this.props.navigation.navigate('WitkeyDetail', { id: item.id, scrollIds, witkeyList: this._refWitkeyFlow.state.data });
		YZhugeIo.track('发现-威客名称', {
			'发现威客名称': item.companyName
		});
	}


}

const styles = StyleSheet.create({
	segmentation: {
		marginLeft: transformSize(50),
		marginRight: transformSize(50),
		height: transformSize(2),
		backgroundColor: "#e3e3e3"
	},
	container: {
		backgroundColor: '#fff'
	}
});