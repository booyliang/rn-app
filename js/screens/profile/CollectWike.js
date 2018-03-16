import React from 'react';
import { StyleSheet, PixelRatio } from 'react-native';
import {
	Content, Container, Right, Button, Text, View, Touchable, Left, Body, Title, Nav,
	withUser, Header, CheckBox, WitkeyItem, Message, Toast, Alert, FlatList, List
} from '../../components';
import { YIcon } from '../../assets';
import { transformSize } from '../../styles';
import { http } from '@services';
import { connect } from 'react-redux';
import {
	cache
} from '@utils';
import noDataIcon from '@assets/images/collect_03.png';
let mapStateToProps = (state) => {
	return {
		data: state.wike,
	};
};

@withUser(true)
@connect(mapStateToProps)
export default class CollectWike extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animating: false,
			check: false,
			showText: "编辑",
			checkIds: {},
			wikdata: []
		};
	}

	renderItem = ({ item }) => {
		return (
			<List>
				<Touchable type="highlight" onPress={() => this.checkBoxShow(item)}>
					<View style={styles.contlist}>
						{this.checkBox(item)}
						<View style={{ flex: 1 }}>
							<WitkeyItem touchable={false} data={item} ></WitkeyItem>
						</View>
					</View>
				</Touchable>
				<View style={styles.segmentation}></View>
			</List>

		);
	}
	render() {
		if (this.props.data.length !== 0) {
			return (
				<Container style={styles.contMain}>
					<Header>
						{this.titleLeft()}
						<Body>
							<Title>我关注的威客</Title>
						</Body>
						{this.titleRight()}
					</Header>
					<Content style={styles.main}>
						<FlatList
							data={this.props.data}
							renderItem={this.renderItem}
							keyExtractor={this._keyExtractor}
							extraData={this.state}
						// ListEmptyComponent={this.renderMain}
						// ItemSeparatorComponent={() => <View style={styles.segmentation}></View>}
						/>
					</Content>
				</Container>
			);
		} else {
			return (
				<Container style={styles.contMain}>
					<Nav title='我关注的威客'></Nav>
					<Message icon={noDataIcon} text='收藏夹为空~' />
				</Container >
			);
		}

	}
	// renderMain() {
	// 	return (
	// 		<Container style={styles.contMain}>
	// 			{/* <Nav title='我关注的威客'></Nav> */}
	// 			<Message icon={noDataIcon} text='收藏夹为空~' />
	// 		</Container >
	// 	);
	// }

	componentDidMount() {
		this.wikeData();
	}

	async wikeData() {
		let res = await http.get('/services/app/v1/witkey/getFollowWitkeys/1/1000');
		let _resData = res.data.data.entities;
		this.setState({
			wikdata: _resData
		});
		this.props.dispatch({ type: 'LOAD_WIKE', payload: _resData });

	}

	_keyExtractor = (item, index) => index;


	titleLeft = () => {
		let leftContent = this.state.animating ? <Text style={styles.delStyle}>取消</Text> : <YIcon name="arrow-back" style={styles.arrowBack} />;
		return (
			<Left>
				<Button transparent onPress={() => this._handleBack()} dark>
					{leftContent}
				</Button>
			</Left>
		);
	}

	titleRight = () => {
		if (this.props.data.length == 0) {
			return (
				<Right>
					<Button transparent dark></Button>
				</Right>
			);

		} else {
			return (
				<Right>
					{this.state.animating ?
						<Button transparent dark onPress={() => this.datleClick()}>
							<Text style={styles.editStyle}>删除</Text>
						</Button> :
						<Button transparent dark onPress={() => this.editClick()}>
							<Text style={styles.editStyle}>编辑</Text>
						</Button>}
				</Right>
			);
		}

	}

	// 头部导航自定义
	_handleBack = () => {
		if (this.state.animating) {
			this.setState({
				animating: false,
			});
		} else {
			this.props.navigation.goBack();
		}
	};
	// 点击编辑改变导航返回状态为取消
	editClick() {
		this.setState({
			animating: true,
		});
	}
	// 复选框显示隐藏
	checkBox(item) {
		if (this.state.animating) {
			return (
				<CheckBox
					onPress={this.checked(item)}
					style={this.state.checkIds[item.id] ? styles.mainCheck : styles.oldCheck}
					checked={!!this.state.checkIds[item.id]} />
			);
		} else {
			null;
		}

	}
	// 点击删除遍历当前选中的元素，删除
	datleClick() {
		let checkItems = [];
		let { checkIds } = this.state;
		for (let key in checkIds) {
			if (checkIds[key])
				checkItems.push(key);
		}
		let _checkItems = checkItems.length;
		if (_checkItems == 0) {
			Toast.show({ text: '请选择要删除的关注~' });
			return;
		}

		let FlagText = '确定删除' + _checkItems + '个关注？';
		Alert.alert(
			'',
			FlagText,
			[
				{ text: '取消', onPress: () => console.log('取消'), style: 'cancel' },
				{
					text: '确定', onPress: async () => {
						let res = await http.get(`/services/app/v1/witkey/followWitkeys/${checkItems}/0`);
						if (res.data.code === '200') {
							Toast.show({ text: '取消关注成功，您将不会再收到该威客相关消息~' });
							this.setState({
								animating: false,
								checkIds: {}
							});
							this.props.dispatch({ type: 'DELETE_WIKE', payload: checkItems });

						}
					}
				},
			],
		);

	}
	// 判断当前状态是否为筛选，不为筛选则点击列表跳转页面到详情
	checkBoxShow(item) {
		if (this.state.animating) {
			this.checked(item)();
		} else {
			this.props.navigation.navigate("WitkeyDetail", { id: item.id });
		}
	}
	// 选中反选
	checked = (item) => () => {
		let checkIds = { ...this.state.checkIds };
		checkIds[item.id] = !checkIds[item.id];
		this.setState({ checkIds });
	}
}



const styles = StyleSheet.create({
	contMain: {
		backgroundColor: "#fff"
	},
	contlist: {
		flexDirection: "row",
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	segmentation: {
		marginLeft: transformSize(50),
		marginRight: transformSize(50),
		height: 2 / PixelRatio.get(),
		backgroundColor: "#eaeaea"
	},
	editStyle: {
		color: "#a8a8a8",
		fontSize: transformSize(52),
		width: transformSize(150),
		textAlign: 'right'
	},
	delStyle: {
		color: "#a8a8a8",
		fontSize: transformSize(52),
		width: transformSize(150),
		textAlign: 'left'
	},
	main: {
		backgroundColor: '#fff'
	},
	leftImg: {
		width: transformSize(250),
		height: transformSize(250),
		borderRadius: transformSize(20),
		alignSelf: "flex-start"
	},
	title: {
		marginBottom: transformSize(53),
		color: "#ff6f6b"
	},
	mainCheck: {
		marginTop: transformSize(-85),
		marginRight: transformSize(45),
		marginLeft: transformSize(25),
		backgroundColor: '#ff6f6b',
		borderColor: '#ff6f6b',
		width: transformSize(60),
		height: transformSize(60),
		borderWidth: transformSize(2),
		borderRadius: transformSize(30),
	},
	oldCheck: {
		marginTop: transformSize(-85),
		marginRight: transformSize(45),
		marginLeft: transformSize(25),
		backgroundColor: '#fff',
		borderColor: '#999',
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
	witkeyitem: {
		width: '100%'
	},
	message: {
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	}
});