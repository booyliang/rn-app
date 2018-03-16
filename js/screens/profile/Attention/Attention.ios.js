import React from 'react';
import { StyleSheet, PixelRatio } from 'react-native';
import {
	Content, Container, Right, Button, Text, ListItem, View, Left, Body,
	Title, Nav, Image, CheckBox, TagGroup, Tag, YIcon,
	withNavigation, Header, withUser, Message, Toast, FlatList, Alert, ArticleItem
} from '../../../components';
import { transformSize } from '../../../styles';
import { http } from '../../../services';
import { connect } from 'react-redux';
// import { cache } from '@utils';
import noDataIcon from '@assets/images/collect_03.png';
let mapStateToProps = (state) => {
	return {
		data: state.attention,
	};
};
@withNavigation
@withUser(true)
@connect(mapStateToProps)
export default class Attention extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animating: false,
			check: false,
			data: [],
			FlagData: [],
			checkIds: {}
		};
	}
	// 点击编辑改变导航返回状态为取消
	editClick() {
		this.setState({
			animating: true,
		});
	}
	datleClick() {
		let checkItems = [];
		let { checkIds } = this.state;
		for (let key in checkIds) {
			if (checkIds[key])
				checkItems.push(key);
		}
		let _checkItems = checkItems.length;
		if (!_checkItems) {
			Toast.show('请选择要删除的关注~');
			return;
		}

		let FlagText = '确定删除' + _checkItems + '个关注？';
		Alert.alert(
			'',
			FlagText,
			[
				{ text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{
					text: '确定', onPress: async () => {
						let res = await http.get(`/services/app/v1/attentionArticle/followArticles/${checkItems}/0`);
						if (res.data.code === '200') {
							Toast.show('取消关注成功，您将不会再收到该资源相关消息~');
							this.setState({
								animating: false,
								checkIds: {}
							});
							this.props.dispatch({ type: 'DELETE_ATTENTION', payload: checkItems });
						}
					}
				},
			],
			{ cancelable: false }
		);
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
	// 选中反选
	checked = (item) => () => {
		console.log('item', item);
		let checkIds = { ...this.state.checkIds };
		checkIds[item.id] = !checkIds[item.id];
		this.setState({ checkIds });
	}

	checkBoxShow(item) {
		if (this.state.animating) {
			this.checked(item)();
		} else {
			this.props.navigation.navigate('Article', { id: item.id });
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

	AttentionLeft = () => {
		let leftContent = this.state.animating ? <Text style={{ color: "#a8a8a8", width: transformSize(150), textAlign: 'left', }}>取消</Text> : <YIcon name="arrow-back" style={styles.arrowBack} />;
		return (
			<Left>
				<Button transparent onPress={() => this._handleBack()} dark>
					{leftContent}
				</Button>
			</Left>
		);
	}

	AttentionRight = () => {
		if (this.props.data.length == 0) {
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
						this.state.animating ?
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

	// 标签处理
	Grouplabel(item) {
		if (item.labels) {
			return item.labels.map((label, index) => {
				return (
					<Tag key={index}>{label.labelName}</Tag>
				);
			});

		}
	}
	// 分类标签处理
	classifys(item) {
		if (item.classifys) {
			return item.classifys.map((item) => {
				return (
					<Text note style={styles.textleft} key={item.id}>{item.classifyName}</Text>
				);

			});

		}
	}
	// 关注人数处理
	attentionNum(num) {
		if (num >= 10000) {
			return Math.floor(num / 10000) + 'W';
		}
		return num;
	}

	renderItem = ({ item }) => {
		return (
			<ListItem style={styles.mainLIst} onPress={() => this.checkBoxShow(item)} key={item.id}>
				{this.checkBox(item)}
				<ArticleItem
					touchableStyle={styles.ArticleItem}
					data={item}
					foot={null}
					onPress={() => this.checkBoxShow(item)}
				// onPress={this.onSelected}
				/>
			</ListItem>
		);
	}

	componentDidMount() {
		this.AttentionData();
	}

	async AttentionData() {
		let res = await http.get('/services/app/v1/attentionArticle/article/1/1000');
		if (res.data.code === '200') {
			if (res.data.data) {
				let _resData = res.data.data.entities;
				this.props.dispatch({ type: 'LOAD_ATTENTION', payload: _resData });
			}
		}
	}
	_keyExtractor = (item, index) => index;

	// renderMain() {
	// 	return (
	// 		<Container style={styles.contMain}>
	// 			{/* <Nav title='我关注的应用百科'></Nav> */}
	// 			<Message icon={noDataIcon} text='收藏夹为空~' />
	// 		</Container >

	// 	);
	// }


	render() {
		if (this.props.data.length !== 0) {
			return (
				<Container style={styles.contMain}>
					<Header>
						{this.AttentionLeft()}
						<Body>
							<Title>我的收藏</Title>
						</Body>
						{this.AttentionRight()}
					</Header>
					<Content>
						<FlatList
							data={this.props.data}
							renderItem={this.renderItem}
							keyExtractor={this._keyExtractor}
							extraData={this.state}
							ItemSeparatorComponent={() => <View style={styles.segmentation}></View>}
							ListFooterComponent={() => <View style={styles.segmentation}></View>}
						// ListEmptyComponent={this.renderMain}
						/>
					</Content>

				</Container>
			);
		} else {
			return (
				<Container style={styles.contMain}>
					<Nav title='我的收藏'></Nav>
					<Message icon={noDataIcon} text='收藏夹为空~' />
				</Container>
			);
		}
	}
}

const styles = StyleSheet.create({
	contMain: {
		backgroundColor: "#fff"
	},
	mainLIst: {
		width: '100%',
		marginLeft: 0,
		marginRight: 0,
		borderBottomWidth: 0,
	},
	ArticleItem: {
		flex: 1,
	},
	LIst: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	segmentation: {
		marginLeft: transformSize(50),
		marginRight: transformSize(50),
		height: 2 / PixelRatio.get(),
		backgroundColor: "#e3e3e3"
		// borderBottomWidth: 1,
		// borderBottomColor: "#ccc"
	},
	mainRight: {
		width: '100%',
		flex: 1
	},
	leftImg: {
		width: transformSize(200),
		height: transformSize(200),
		borderRadius: transformSize(40),
		marginRight: transformSize(50),
		borderWidth: transformSize(1),
		borderColor: '#e3e3e3'
	},
	mainCheck: {
		// marginTop: transformSize(-115),
		marginRight: transformSize(65),
		marginLeft: transformSize(50),
		width: transformSize(60),
		height: transformSize(60),
		backgroundColor: '#ff6f6b',
		borderColor: '#ff6f6b',
		borderWidth: transformSize(2),
		borderRadius: transformSize(30),
	},
	oldCheck: {
		// marginTop: transformSize(-115),
		marginRight: transformSize(65),
		marginLeft: transformSize(50),
		width: transformSize(60),
		height: transformSize(60),
		backgroundColor: '#fff',
		borderColor: '#999',
		borderWidth: transformSize(2),
		borderRadius: transformSize(30),
	},
	mainRightItem: {
		padding: 0,
		margin: 0,
		fontSize: transformSize(46),
		marginBottom: transformSize(25),
		color: '#000',
	},
	mainRightItemTit: {
		fontSize: transformSize(56),
		color: '#000',
		fontWeight: 'bold',
		marginTop: transformSize(10)
	},
	mainRightTag: {
		marginBottom: transformSize(25)
	},
	mainrTextRight: {
		flex: 1,
		flexDirection: "row",
		justifyContent: 'space-between',

	},
	mainrText: {
		flexDirection: "row",
	},
	textleft: {
		marginRight: transformSize(20),
		// lineHeight: transformSize(60),
	},
	arrowBack: {
		fontSize: transformSize(54),
		color: '#666',
		textAlign: 'left',
		marginLeft: -4,

	},
});