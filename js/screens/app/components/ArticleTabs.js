import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet
} from 'react-native';
import {
	Tabs,
	Tab,
	ArticleItem,
	FlowList,
} from '@components';
import {
	http
} from '@services';
import styles from '@styles';

class ArticleTabs extends React.Component {
	render() {
		const columns = this.state.columns;

		if (!columns.length) {
			return this.renderList(this.props.columnId);
		}

		const tabs = columns.map((column, index) => (
			<Tab
				key={index}
				heading={column.columnName}
				tabStyle={s.tabBarItem}
				activeTabStyle={s.activeTabBarItem}
				textStyle={s.tabBarItemText}
				activeTextStyle={s.activeTabBarItemText}
			>
				{this.renderList(column.id)}
			</Tab>
		));

		return (
			<Tabs
				locked
				scrollWithoutAnimation
				tabBarUnderlineStyle={s.tabBarUnderline}
				tabContainerStyle={s.tabBar}
			>
				{tabs}
			</Tabs>
		);
	}

	async getColumns() {
		this.setState({
			columns: (await http.get('/services/app/v1/column/list', {
				params: {
					parentId: this.props.columnId
				}
			})).data.data
		});
	}

	componentWillMount() {
		this.getColumns();
	}

	renderList = (columnId) => {
		return (
			<FlowList
				request={`/services/app/v1/article/list/${this.props.appId}/${columnId}`}
				renderItem={this.renderItem}
				onScrollEndDrag={this.props.onScrollEndDrag}
				onRefresh={this.props.onRefresh}
			/>
		);
	};

	renderItem = ({item}) => {
		return <ArticleItem data={item} whithout/>;
	};

	state = {
		columns: []
	};

	static propTypes = {
		appId: PropTypes.number.isRequired,
		columnId: PropTypes.string.isRequired,
		onScrollEndDrag: PropTypes.func,
		onRefresh: PropTypes.func,
	};
}

const tabBarItem = {
	...styles.border,
	borderWidth: styles.transformSize(3),
	marginHorizontal: styles.transformSize(21),
	borderRadius: styles.transformSize(6)
};
const tabBarItemText = {
	fontWeight: 'normal',
	fontSize: styles.transformSize(46),
	color: styles.textAssistColor
};
const s = StyleSheet.create({
	tabBar: {
		...styles.padder,
		height: styles.transformSize(80)
	},
	tabBarUnderline: {
		display: 'none'
	},
	tabBarItem,
	activeTabBarItem: {
		...tabBarItem,
		borderColor: styles.assistColor
	},
	tabBarItemText,
	activeTabBarItemText: {
		...tabBarItemText,
		color: styles.assistColor
	}
});

export default ArticleTabs;