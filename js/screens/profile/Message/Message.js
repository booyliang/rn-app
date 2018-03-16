import React from 'react';
import { StyleSheet } from 'react-native';
import {
	Content, Container, Right, Button, Text, ListItem, View, Left, Body, Title, List, withNavigation, Header, CheckBox, withUser, Toast, Image
} from '../../../components';
import { YIcon } from '../../../assets';
import { transformSize } from '../../../styles';
import { connect } from 'react-redux';
import moment from 'moment';
import { YZhugeIo } from '@ydk';
let mapStateToProps = (state) => {
	return {
		pushInfoList: state.jpush.pushInfoList,
		pushAnnInfo: state.jpush.pushAnnouncementInfo,
		pushCount: state.jpush.pushCount,
	};
};
@withUser(true)
@withNavigation
@connect(mapStateToProps)
export default class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checkIds: {},
			msgshow: false
		};
	}

	titleLeft = () => {
		let leftContent = this.state.msgshow ? <Text style={{ color: "#a8a8a8", width: transformSize(150), textAlign: 'left', fontSize: transformSize(52) }}>取消</Text> : <YIcon name="arrow-back" style={styles.arrowBack} />;
		return (
			<Left>
				<Button transparent onPress={() => this._handleBack()} dark>
					{leftContent}
				</Button>
			</Left>
		);
	}

	titleRight = () => {
		if (this.props.pushInfoList.length == 0) {
			return (
				<Right>
					<Button transparent dark>

					</Button>
				</Right>
			);

		} else {
			return (
				<Right>
					{
						this.state.msgshow ?
							<Button transparent dark onPress={() => this.datleClick()}>
								<Text style={{ color: "#a8a8a8", width: transformSize(150), textAlign: 'right', fontSize: transformSize(52) }}>删除</Text>
							</Button> :
							<Button transparent dark onPress={() => this.editClick()}>
								<Text style={{ color: "#a8a8a8", width: transformSize(150), textAlign: 'right', fontSize: transformSize(52) }}>编辑</Text>
							</Button>

					}
				</Right>
			);
		}

	}
	// 返回
	_handleBack() {
		if (this.state.msgshow) {
			this.setState({
				msgshow: false,
			});
		} else {
			this.props.navigation.goBack();
		}
	}
	// 删除
	datleClick() {
		let checkItems = [];
		let { checkIds } = this.state;
		for (let key in checkIds) {
			if (checkIds[key])
				checkItems.push({ messageId: key });
		}
		let _checkItems = checkItems.length;
		if (_checkItems == 0) {
			Toast.show({ text: '请选择要删除的通知~' });
			return;
		}
		Toast.show({ text: '删除成功~' });
		this.props.dispatch({ type: 'DELETE_LIST_PUSH_INFO', payload: checkItems });
	}
	// 编辑
	editClick() {
		this.setState({
			msgshow: true
		});
	}
	// 选中
	checked = (item) => () => {

		let checkIds = { ...this.state.checkIds };
		checkIds[item.messageId] = !checkIds[item.messageId];

		this.setState({ checkIds });

	}

	getPushTime = (time) => {
		if (time) {
			if (new Date(time).toDateString() == new Date().toDateString()) {
				return moment(time, 'x').format('HH:mm');
			}
			return moment(time, 'x').format('YYYY-MM-DD');
		} else {
			return '';
		}

	}

	toItemScreen = (item) => () => {
		if (this.state.msgshow) {
			this.checked(item)();
		} else {
			YZhugeIo.track('消息应用活动', {
				'活动标题': item.title
			});
			// (0 公告，1 活动，2 关注）
			let screens = { 1: 'Article', 2: 'App' };
			this.props.navigation.navigate(screens[item.type], {
				id: item.typeId
			});
			this.props.dispatch({ type: 'CHANGE_PUSH_INFO', payload: item });
		}
	}

	toAnnScreen = (item) => () => {
		YZhugeIo.track('公告主题', {});
		this.props.navigation.navigate("Notice");
		this.props.dispatch({ type: 'CHANGE_PUSH_ANNOUNCEMENT_READ', payload: item });
	}

	renderItem = (item, index) => {
		return (
			<View key={index}>
				<ListItem style={styles.mainList} avatar onPress={this.toItemScreen(item)}>
					{
						this.state.msgshow ? <CheckBox onPress={this.checked(item)}
							style={this.state.checkIds[item.messageId] ? styles.mainCheck : styles.oldCheck} checked={!!this.state.checkIds[item.messageId]} /> : null
					}
					<Left>
						<Image style={styles.mainInage} square source={{ uri: item.iconUrl }} />
						{item.hasRead ? null : <View style={styles.newDot}></View>}
					</Left>
					<View style={styles.mainBody}>
						<View style={styles.listTitle}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.titletime}>{this.getPushTime(item.time)}</Text>
						</View>
						<Text numberOfLines={1}>{item.content}</Text>
					</View>
					<View style={styles.segmentation}></View>
				</ListItem>
				<View style={styles.segmentation}></View>
			</View>

		);
	}

	render() {
		let pushAnnInfo = this.props.pushAnnInfo;

		return (
			<Container style={styles.contMain}>
				<Header>
					{this.titleLeft()}
					<Body>
						<Title>消息</Title>
					</Body>
					{this.titleRight()}
				</Header>
				<Content>
					<List>
						<View>
							<ListItem style={styles.mainList} avatar onPress={this.toAnnScreen(pushAnnInfo)}>
								<Left>
									<Image style={styles.mainInage} square source={require('../../../assets/images/icon-notice.png')} />
									{pushAnnInfo.hasRead ? null : <View style={styles.newDot}></View>}
								</Left>
								<View style={styles.mainBody}>
									<View style={styles.listTitle}>
										<Text style={styles.title}>系统公告</Text>
										<Text style={styles.titletime}>{this.getPushTime(pushAnnInfo.time)}</Text>
									</View>
									<Text style={styles.titlecont} numberOfLines={1}>{'[' + pushAnnInfo.title + ']' + pushAnnInfo.content}</Text>
								</View>
							</ListItem>
							<View style={styles.segmentation}></View>
						</View>

						{this.props.pushInfoList.map(this.renderItem)}
					</List>
				</Content>
			</Container>
		);
	}

}

const styles = StyleSheet.create({
	contMain: {
		backgroundColor: '#FFF',
	},
	mainList: {
		paddingTop: transformSize(65),
		paddingBottom: transformSize(65),
		marginLeft: 0,
		marginRight: 0,
		paddingLeft: transformSize(50),
		paddingRight: transformSize(50),
		borderBottomWidth: 0,
		// borderBottomColor: '#e3e3e3',
	},
	mainInage: {
		width: transformSize(160),
		height: transformSize(160),
		borderRadius: transformSize(25)
	},

	mainBody: {
		flex: 1,
		borderBottomWidth: 0,
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingLeft: transformSize(50)
	},
	newDot: {
		position: 'absolute',
		top: 0,
		right: -5,
		width: transformSize(40),
		height: transformSize(40),
		borderWidth: transformSize(5),
		borderColor: "#fff",
		borderRadius: transformSize(20),
		backgroundColor: '#F00',
		// elevation: 20,
		// marginLeft: -10,
		// paddingLeft: 10,
		// shadowOffset: { width: 2, height: 0 },
		// shadowColor: '#fff',
		// shadowOpacity: 5,
		// shadowRadius: 5
	},
	title: {
		paddingTop: transformSize(5),
		// paddingBottom: transformSize(60),
		fontSize: transformSize(56),
		color: "#000"
	},
	listTitle: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		// marginTop: transformSize(-10)

	},
	titlecont: {
		fontSize: transformSize(50),
		color: '#666'
	},
	titletime: {
		color: '#aaaaaa',
		fontSize: transformSize(40),
		textAlign: 'right'
	},
	mainCheck: {
		// marginTop: transformSize(-110),
		marginRight: transformSize(65),
		backgroundColor: '#ff6f6b',
		borderColor: '#ff6f6b',
		width: transformSize(60),
		height: transformSize(60),
		borderWidth: transformSize(2),
		borderRadius: transformSize(30),
	},
	oldCheck: {
		// marginTop: transformSize(-110),
		marginRight: transformSize(65),
		backgroundColor: '#fff',
		borderColor: '#bfbfbf',
		width: transformSize(60),
		height: transformSize(60),
		borderWidth: transformSize(2),
		borderRadius: transformSize(30),
	},
	arrowBack: {
		fontSize: transformSize(54),
		color: '#666',
		textAlign: 'left',
		marginLeft: -4,

	},
	segmentation: {
		marginLeft: transformSize(50),
		marginRight: transformSize(50),
		height: transformSize(2),
		backgroundColor: "#eaeaea"
		// borderBottomWidth: 1,
		// borderBottomColor: "#ccc"
	},
});