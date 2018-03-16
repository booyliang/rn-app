import React, { Component } from 'react';
import { withNavigation, ActItem, StyleSheet, View } from '../../components';
import CommonSearch from './components/CommonSearch';
import { YZhugeIo } from '@ydk';
import styles from '@styles';
@withNavigation
export default class SearchWitkey extends React.PureComponent {
	render() {
		YZhugeIo.track('搜索_活动', {
			// 'userId': ''
		});

		let emptyComp = <NoResult comments={`没有找到与“${this.props.keyWords}”相关的活动`} />;
		let relatedReq = '/services/app/v1/es/article/list/activity/0';
		let recommendReq = '/services/app/v1/activity/list';
		return (
			<CommonSearch
				{...this.props}
				relatedRequest={relatedReq}
				recommendRequest={recommendReq}
				renderItem={this.renderItem}
				EmptyComponent={emptyComp}
			></CommonSearch>

		);
	}
	renderItem = ({ item }) => {
		return (
			// <ActItem data={item} onPress={this.toActDetail(item.id)} style={style.item}></ActItem>
			<View>
				<ActItem data={item} onPress={this.toActDetail(item.id)}></ActItem>
				<View style={style.item}></View>
			</View>
		);
	}
	toActDetail = (id) => () => {
		this.props.navigation.navigate('Article', { id });
	}

}
const style = StyleSheet.create({
	item: {
		// width: 400,
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#e3e3e3',
		marginHorizontal: styles.transformSize(50),
	}
});

