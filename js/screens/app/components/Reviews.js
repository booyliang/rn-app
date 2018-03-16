import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet
} from 'react-native';
import {
	FlowList,
	View,
	Text,
	YIcon,
	ActionSheet,
	Button,
} from '@components';
import ReviewItem from './ReviewItem';
import {
	tranformNum
} from '@utils';
import styles from '@styles';
import { YZhugeIo } from '@ydk';
const sortWays = [
	{
		text: '最新',
		code: 0
	},
	{
		text: '最有帮助',
		code: 2
	},
	{
		text: '最高评分',
		code: 3
	},
	{
		text: '最低评分',
		code: 4
	},
];

class Reviews extends React.Component {
	render() {
		return (
			<FlowList
				request={this.state.request}
				renderItem={this.renderItem}
				ListHeaderComponent={this.renderHead()}
				onScrollEndDrag={this.props.onScrollEndDrag}
				onRefresh={this.props.onRefresh}
				onFetchedData={this.handleFetchedData}
			/>
		);
	}

	componentDidMount() {
		this.createRequest();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.sortWayIndex !== prevState.sortWayIndex) {
			this.createRequest();
		}
	}

	renderItem = ({ item }) => {
		return <ReviewItem data={item} style={s.item} />;
	};

	renderHead = () => {
		return (
			<View padder style={s.head}>
				<View style={s.title}>
					<YIcon name="comment-big" size={styles.transformSize(50)} style={s.titleIcon} />
					<Text style={s.titleText}>{tranformNum(this.props.count)} 条点评</Text>
				</View>
				<Button transparent onPress={this.openSortWays}>
					<Text style={s.sortWays}>{sortWays[this.state.sortWayIndex].text}</Text>
					<YIcon name="arrow-down" size={styles.transformSize(48)} style={s.sortIcon} />
				</Button>
			</View>
		);
	};

	createRequest = () => {
		this.setState({
			request: {
				url: `/services/app/v1/comment/listByAppId`,
				params: {
					appId: this.props.appId,
					order: sortWays[this.state.sortWayIndex].code
				}
			}
		});
	};

	openSortWays = () => {
		YZhugeIo.track('点评排序', {});
		ActionSheet.show({
			options: sortWays.map((way) => way.text).concat(['取消']),
			cancelButtonIndex: sortWays.length
		}, (index) => {
			index = Number(index);

			if (index < 0 || index === sortWays.length) {
				return;
			}

			this.setState({
				sortWayIndex: index
			});
			YZhugeIo.track('点评排序依据', {
				'点评排序依据': sortWays[index].text
			});
		});
	};

	handleFetchedData = (data, response) => {
		this.props.onRefreshed(response.data.data);
	};

	state = {
		sortWayIndex: sortWays[0].code,
		request: null
	};

	static propTypes = {
		appId: PropTypes.number,
		count: PropTypes.number,
		onScrollEndDrag: PropTypes.func,
		onRefresh: PropTypes.func,
		onRefreshed: PropTypes.func
	};
}

const s = StyleSheet.create({
	head: {
		...styles.inlineWrap,
		justifyContent: 'space-between',
		marginBottom: styles.transformSize(60)
	},
	title: {
		...styles.inlineWrap,
		alignItems: 'center'
	},
	titleIcon: {
		color: '#bfbfbf',
		marginRight: styles.transformSize(38)
	},
	titleText: {
		fontSize: styles.transformSize(44),
		color: styles.textAssistColor
	},
	sortWays: {
		fontSize: styles.transformSize(44),
		color: styles.textSecondaryColor
	},
	sortIcon: {
		color: '#bfbfbf',
		marginLeft: styles.transformSize(33)
	},
	item: {
		marginBottom: styles.transformSize(90)
	}
});

export default Reviews;