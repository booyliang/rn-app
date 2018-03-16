import React, { Component } from 'react';
import { StyleSheet, View, ArticleItem, AppBar, FlowList, withNavigation, Platform } from '../../components';
import styles from '../../styles';
import { navigate } from '../../services';

class Card extends React.PureComponent {
	render() {
		let item = this.props.item;
		let { contentInfo = {} } = this.props.item;
		let appItem = item.app || {};
		// let appBarEl = Platform.OS === 'android' ? <AppBar data={appItem} style={style.appbar} btnStyle={style.downBtn} downTxtStyle={style.downText} /> : <View style={style.emptyView} />;
		let appBarEl = <AppBar data={appItem} style={style.appbar} btnStyle={style.downBtn} downTxtStyle={style.downText} />;
		return (
			<View style={[style.card, Platform.OS === 'ios' ? style.iosPadding : '']} key={contentInfo.id}>
				<ArticleItem data={contentInfo} foot={null} whithout style={style.article}
					onPress={() => this.props.onPress(contentInfo, this.props.index)} />
				{appBarEl}
			</View>
		);
	}
}
export default class HomeCard extends Component {
	render() {
		let listApi = "/services/app/v1/home/list";
		return (
			<FlowList
				renderItem={this.renderItem}
				request={listApi}
				enableCacheFirstPage={true}
				{...this.props}
				ref={(card) => { this._refFlowList = card; }}>
			</FlowList>
		);
	}

	renderItem = ({ item, index }) => {
		return (<Card item={item} index={index} onPress={this.handleArticlePress}/>);
		// let { contentInfo = {} } = item;
		// let appItem = item.app || {};
		// return (
		// 	<View style={style.card} key={contentInfo.id}>
		// 		<ArticleItem data={contentInfo} foot={null} whithout style={style.article} onPress={()=>this.handleArticlePress( contentInfo, index )}/>
		// 		<AppBar data={appItem} style={style.appbar} btnStyle={style.downBtn} downTxtStyle={style.downText} />
		// 	</View>
		// );
	}
	handleArticlePress = (data, index) => {
		let articleIds = this._refFlowList.state.data.map(item => item.contentInfo.id);
		let len = articleIds.length - 1;
		let activeLen = 0;
		let startIndex = Math.max(index - activeLen, 0);
		let endIndex = Math.min(len, index + activeLen);
		let newArticleIds = articleIds.slice(startIndex, endIndex + 1);
		navigate('Article', { id: data.id, articleIds: [data.id] });
	}

}

const style = StyleSheet.create({
	card: {
		marginBottom: styles.transformSize(30),
		backgroundColor: '#fff',
		// elevation: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: styles.transformSize(10),
	},
	article: {
		paddingTop: styles.transformSize(50),
		paddingBottom: 0,
	},
	appbar: {
		paddingTop: styles.transformSize(45),
		paddingBottom: styles.transformSize(56),
		backgroundColor: '#fff',
	},
	downBtn: {
		backgroundColor: styles.themeColor,
	},
	downText: {
		color: '#fff',
		fontSize: styles.transformSize(46),
	},
	iosPadding: {
		paddingBottom: styles.transformSize(50),
	}
});