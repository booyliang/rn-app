import React, { Component } from 'react';
import { withNavigation, ArticleItem, NoResult } from '../../components';
import CommonSearch from './components/CommonSearch';
import { YZhugeIo } from '@ydk';
import styles from '@styles';
@withNavigation
export default class SearchWitkey extends React.PureComponent {
	render() {
		YZhugeIo.track('搜索_文章', {

		});

		let emptyComp = <NoResult comments={`没有找到与“${this.props.keyWords}”相关的文章`} />;
		let relatedReq = '/services/app/v1/es/article/list/article/0';
		let recommendReq = '/services/app/v1/article/list';
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
			<ArticleItem data={item} key={item.id} whithout style={styles.borderBottom}></ArticleItem>
		);
	}

}
