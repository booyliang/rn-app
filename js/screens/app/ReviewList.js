import React from 'react';
import {
	navigate
} from '@services';
import {
	FlowList,
	View,
	Text,
	YIcon,
	ActionSheet,
	Button,
	Nav,
	Container,
	StyleSheet
} from '@components';
import ReviewItem from './components/ReviewItem';
import {
	tranformNum
} from '@utils';
import styles from '@styles';
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

class ReviewList extends React.Component {
	
	render() {
		return (
			<Container style={s.wrap}>
				<Nav title="" style={s.nav}></Nav>
				<FlowList 
					request={this.state.request}
					renderItem={this.renderItem}
					ListHeaderComponent={this.renderHead()}
					onFetchedData={this.handleFetchedData}
				/>
				<View style={s.actionBar}>
					<Button block style={s.action} onPress={this.handlePressReview}>
						<View style={s.actionInner}>
							<YIcon name="edit" style={s.actionIcon} />		
							<Text style={s.actionText}>我来点评</Text>
						</View>
					</Button>
				</View>
			</Container>
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
					<Text style={s.titleText}>{tranformNum(this.state.data.count)} 条点评</Text>
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
					appId: this.props.navigation.state.params.appId,
					order: sortWays[this.state.sortWayIndex].code
				}
			}
		});
	};

	openSortWays = () => {
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
		});
	};

	handleFetchedData = (data, response) => {
		this.setState({data: response.data.data});
	};

	handlePressReview = () => {
		navigate('NewReview', {
			appId: this.props.navigation.state.params.appId
		});
	};

	state = {
		sortWayIndex: sortWays[0].code,
		request: null,
		data: []
	};

}

const s = StyleSheet.create({
	nav: {
		borderBottomWidth: 0 
	},
	wrap: {
		backgroundColor: '#fff'
	},
	actionBar: {
		...styles.inlineWrap,
		...styles.borderTop,
		borderTopWidth: 1,
		paddingBottom: styles.artionBarBottomPadding,
		backgroundColor: '#fff'
	},

	actionIcon: {
		fontSize: styles.transformSize(70),
		color: '#dbdbdb',
		marginRight: styles.transformSize(20)
	},
	action: {
		flex: 1,
		paddingVertical: styles.transformSize(43),
		borderRadius: 0,
		backgroundColor: '#fff',
	},
	actionInner: {
		...styles.inlineWrap,
		...styles.centerWrap,
		flex: 1,
	},
	actionText: {
		fontWeight: 'bold',
		backgroundColor: 'transparent'
	},
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

export default ReviewList;