import React from 'react';
import { StyleSheet, NativeModules, PixelRatio, Platform } from 'react-native';
import {
	Content, Container, Right, Text, ListItem, View, Touchable, Nav, List, Image, Form, Input, Textarea, ActionSheet, withUser, withNavigation, CheckBox, Toast, Alert, FlatList, Button
} from '../../components';
import { YIcon } from '../../assets';
import { transformSize } from '../../styles';
import { http } from "../../services";
import { ImagePicker } from '@ydk';
import { connect } from 'react-redux';
const platform = Platform.OS;
let mapStateToProps = (state) => {
	return {
		userdata: state.intro,
		city: state.city,
	};
};

let jsonData = require('./components/cityThree.json');
let moheadImg = require('../../assets/images/default-avatar.png');

let FirstData = [
	'男',
	'女',
];
var BUTTONS = ["拍照", "选择相册", "取消"];

@withUser(true)
@connect(mapStateToProps)
@withNavigation
export default class Intro extends React.Component {
	headerRight() {
		return (
			<Button transparent onPress={this.Submit.bind(this)}>
				<Text style={styles.haderTitle}>保存</Text>
			</Button>

		);
	}


	// 定义默认属性
	static defaultProps = {
		// 默认显示北京(省)
		selectedProvince: '',
		// 默认显示北京省会市)
		selectedCity: '',
		// 默认显示(区)
		selectedArea: ''
	}

	// 通过 state 更新
	constructor(props) {
		super(props);

		this.state = {
			headImg: null,
			sex: '',
			addr: '',
			userSign: '',
			nickName: '',
			firstValue: FirstData[0],
			// 省
			province: [],
			// 市
			city: [],
			// 区
			area: [],
			// 选中的省
			selectedProvince: this.props.selectedProvince,
			// 选中的市
			selectedCity: this.props.selectedCity,
			// 选中的地区
			selectedArea: this.props.selectedArea,

			cityPicker: false,

			selectedsex: this.props.selectedsex,
			maxText: 0,
			_cityShow: false,
			cityShow: false,
			sexShow: false,
			onFocus: false
		};
	}

	// 获取用户信息
	useSummary() {
		let _addr = this.props.user.addr ? this.props.user.addr.split(' ') : this.props.user.addr;
		this.setState({
			headImg: this.props.user.headImg,  // 用户头像 headImg
			nickName: this.props.user.nickName || "", // 用户昵称
			sex: this.props.user.sex == '0' ? '女' : '男',	//   性别
			addr: this.props.user.addr,        //  地址
			selectedProvince: this.props.user.addr ? _addr[0] : '',
			selectedCity: this.props.user.addr ? _addr[1] : '',
			selectedArea: this.props.user.addr && _addr[2] ? _addr[2] : '',
			userSign: this.props.user.userSign,  // 个人签名
		});
	}

	// 编辑用户信息
	Submit = async () => {
		let parmes = {
			userId: this.props.user.userId,
			headImg: this.state.headImg,
			sex: this.state.sex == '女' ? '0' : '1',
			addr: this.state.selectedProvince + ' ' + this.state.selectedCity + ' ' + this.state.selectedArea,
			userSign: this.state.userSign,
			nickName: this.state.nickName,
		};
		let res = await http.post('/services/app/v1/user/cust/editor/local', parmes);
		let resData = res.data;
		if (resData.code == '200') {
			this.props.dispatch({ type: 'SIGN_EDIT', payload: parmes });
			Toast.show({ text: '保存成功~' })
			this.props.navigation.goBack();
			// Alert.alert(
			// 	'',
			// 	'保存成功！',
			// 	[
			// 		{
			// 			onPress: async () => {
			// 				this.props.navigation.goBack();
			// 			}
			// 		},
			// 	],
			// 	{ cancelable: false }
			// );

		} else {
			Toast.show({ text: resData.msg });
		}

	}

	// ——————————————————————————————性别选择————————————————————————————————

	sexList() {
		return (
			<List>
				{FirstData.map((key, i) => this.renderSex(key, i))}
			</List>
		);

	}
	renderSex(key, i) {
		return (
			<ListItem style={styles.List} key={i} onPress={this.SexClick.bind(this, key)}>
				<Text style={styles.text} value={key}>{key}</Text>
				{this.state.sex === key ? <Right>
					<CheckBox style={styles.Radio} checked={true} />
				</Right> : null}
			</ListItem>
		);

	}
	SexClick(value) {
		this.setState({
			sex: value,
			sexShow: false,
			_cityShow: false,
		});
	}

	_sexClick() {
		this.setState({
			_cityShow: true,
			sexShow: true,

		});
	}
	// ——————————————————————————————性别选择结束—————————————————————————————


	// 获取全国省: ['省1', '省2', '省3'......]
	getProvince() {
		var result = [];
		for (var code in jsonData) {
			result.push(jsonData[code].name);
		}
		return result;
	}

	// 获取各个省的城市[['省1-城市1', '省1-城市2', '省1-城市3'......],['省2-城市1', '省2-城市2', '省2-城市3'......]]
	getProvinceCity(province) {
		var result = [];
		var cityData = [];
		for (var code in jsonData) {
			let temp = jsonData[code].name;
			if (temp == province) {
				cityData = jsonData[code].children;
				for (var j in cityData) {
					result.push(cityData[j].name);
				}
				break;
			}
		}

		return result;
	}

	// 获取各个省的城市[['省1-城市1-区1', '省1-城市1-区2', '省1-城市1-区3'......]......]
	getProvinceCityArea(province, city) {
		var result = [];
		var cityData = [];
		for (var code in jsonData) {
			let tempProvince = jsonData[code].name;
			if (tempProvince == province) {
				cityData = jsonData[code].children;
				for (var j in cityData) {
					tempCity = cityData[j].name;
					_tempCity = cityData[j].children;
					if (tempCity == city) {
						for (var k in _tempCity) {
							result.push(_tempCity[k].name);
						}
						break;
					}
				}
				// for (var j in cityData) {
				// 	let tempCity = cityData[j].name;
				// 	// console.log('查询省: ' + tempProvince + '    查询城市: ' + city)
				// 	if (tempCity == city) {
				// 		result = cityData[j].area;
				// 		// console.log('查询区: ' + result)
				// 		break;
				// 	}
				// }
			}
		}

		return result;
	}


	componentDidMount() {

		this.useSummary();

		var province = this.getProvince();
		// this.state.selectedProvince = province[0];

		var city = this.getProvinceCity(this.state.selectedProvince);
		// this.state.selectedCity = city[0];

		var area = this.getProvinceCityArea(this.state.selectedProvince, this.state.selectedCity);
		// this.state.selectedArea = area[0];

		// 初始化城市复制
		this.setState({
			province: province,
			city: city,
			area: area
		});
	}

	// 控制城市以及性别选择
	_cityClick = (item) => {
		this.setState({
			_cityShow: true
		}, () => {
			console.log('this.flatList', this.flatList);
			this.flatList.props.data.map((value, index) => {
				if (item === value) {
					this.flatList.scrollToIndex({ viewPosition: 0, index: index });
				}
			});
		});
		// this.props.navigation.navigate('City')
	}

	// 省级选择，【Radio 的selected表现选中状态，这里通过点击存入数据和当前本身数据匹配完成，点击的存入在onClick方法】
	renderProvince = ({ item, index }) => {
		return (
			<ListItem style={[styles.List, styles.ListLine]} key={index} onPress={() => this.onClick(item)}>
				<Text style={styles.text} value={item}>{item}</Text>
				{
					this.state.selectedProvince === item ? <Right>
						<CheckBox style={styles.Radio} checked={true} />
					</Right> : null
				}
			</ListItem >
		);

	}
	//  市级选择
	renderCity = ({ item, index }) => {
		return (
			<ListItem style={[styles.List, styles.ListLine]} key={index} onPress={this.updateProvinceCity.bind(this, item)} >
				<Text style={styles.text}>{item}</Text>
				{
					this.state.selectedCity === item ? <Right>
						<CheckBox style={styles.Radio} checked={true} />
					</Right> : null
				}
			</ListItem >
		);
	}

	// 地区选择
	renderArea = ({ item, index }) => {
		return (
			<ListItem style={[styles.List, styles.ListLine]} key={index} onPress={this.updateProvinceCityArea.bind(this, item)} >
				<Text style={styles.text}>{item}</Text>
				{
					this.state.selectedArea === item ? <Right>
						<CheckBox style={styles.Radio} checked={true} />
					</Right> : null
				}
			</ListItem >
		);

	}

	// 存省 当地区只存在一级的时候选择即返回
	onClick(value) {
		if (value === '台湾省' || value === '香港特别行政区' || value === '澳门特别行政区') {
			this.setState({
				city: this.getProvinceCity(value),
				selectedProvince: value,
				selectedCity: '',
				selectedArea: '',
				cityShow: false,
				areaShow: false,
				_cityShow: false
			});
		} else {
			this.setState({
				city: this.getProvinceCity(value),
				selectedProvince: value,
				selectedCity: '',
				selectedArea: '',
				cityShow: true
			});
		}
	}

	// 存市
	updateProvinceCity(value) {
		this.setState({
			area: this.getProvinceCityArea(this.state.selectedProvince, value),
			selectedCity: value,
			selectedArea: '',
			cityShow: false,
			areaShow: true
		});

	}

	// 存区
	updateProvinceCityArea(value) {
		this.setState({
			area: this.getProvinceCityArea(this.state.selectedProvince, value),
			selectedArea: value,
			cityShow: false,
			areaShow: false,
			_cityShow: false
		});

		// this.props.navigation.goBack();
	}

	// 当切换到性别和地区选择列表是重新定义返回，这里是因为我在一个页面实现了地区和性别的选择，为了避免页面跳转数据存储，原本是采用的原生【Picker】
	// 因为ios和Android自身样式差别太大而放弃。通过显示隐藏的方式在同一个页面来实现.
	_renderLeft() {
		this.setState({
			sexShow: false,
			_cityShow: false,
			cityShow: false,
			areaShow: false,
			selectedProvince: this.state.selectedProvince ? this.state.selectedProvince : '',
			selectedCity: this.state.selectedCity ? this.state.selectedCity : '',
			selectedArea: this.state.selectedArea ? this.state.selectedArea : ''
		});
		return false;
	}

	_getItemLayout = (item, index) => {
		const ITEM_HEIGHT = transformSize(172); // item的高度
		const HEADER_HEIGHT = transformSize(0);  // 分组头部的高度
		const SEPARATOR_HEIGHT = transformSize(2);  // 分割线的高度
		let [length, separator, header] = [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER_HEIGHT];
		return { length, offset: (length + separator) * index, index };
	}


	// 地区三级列表
	mainlist() {
		if (!this.state.cityShow && !this.state.areaShow) {
			return (
				<FlatList
					ref={(ref) => { this.flatList = ref; }}
					data={this.state.province}
					renderItem={this.renderProvince}
					getItemLayout={this._getItemLayout}
					keyExtractor={this._keyExtractor}
					extraData={[this.state.cityShow, this.state.areaShow, this.state._cityShow]}
					ItemSeparatorComponent={() => <View style={styles.segmentation}></View>}
					initialNumToRender={34}
				/>

			);
		} else if (this.state.cityShow) {
			return (
				<FlatList
					data={this.state.city}
					renderItem={this.renderCity}
					keyExtractor={this._keyExtractor}
					extraData={[this.state.cityShow, this.state.areaShow, this.state._cityShow]}
					ItemSeparatorComponent={() => <View style={styles.segmentation}></View>}
				/>
			);

		} else if (this.state.areaShow) {
			return (
				<FlatList
					data={this.state.area}
					renderItem={this.renderArea}
					keyExtractor={this._keyExtractor}
					extraData={[this.state.cityShow, this.state.areaShow, this.state._cityShow]}
					ItemSeparatorComponent={() => <View style={styles.segmentation}></View>}
				/>
			);
		}


	}
	_keyExtractor = (item, index) => index;
	// 点击性别||地区时显示相应列表
	cityMain() {
		if (this.state.sexShow) {
			return (
				<Container>
					<Nav handleBack={this._renderLeft.bind(this)} title='性别'></Nav>
					<Content>
						{this.sexList()}
					</Content>
				</Container>
			);

		} else {
			return (
				<Container>
					<Nav handleBack={this._renderLeft.bind(this)} title='所在城市'></Nav>
					<Content>
						{this.mainlist()}
					</Content>
				</Container>
			);
		}

	}
	// 获取输入的昵称
	NickonEndEditing(value) {
		this.setState({
			nickName: value
		});
	}
	// 这里动态计算富文本框输入字数
	onChange(value) {
		this.setState({
			maxText: value.length,
			userSign: value
		});
	}
	// 签名获取焦点
	onFocus() {
		this.setState({
			onFocus: true
		});
	};
	onBlur() {
		this.setState({
			onFocus: false
		});
	};
	// 上传头像
	async sheet() {
		ActionSheet.show({
			title: '请选择',
			options: BUTTONS,
			cancelButtonIndex: 2,
		}, async (index) => {
			if (BUTTONS[index] === '拍照') {
				let isIOS = platform === 'ios' ? true : false;
				if (isIOS) {
					NativeModules.YCommon.getCameraPermission().then(async () => {
						let result = await ImagePicker.launchCameraAsync({
							allowsEditing: true,
							base64: true,
							aspect: [4, 3],
						});
						// console.log(result.base64);
						if (!result.cancelled) {
							let ossDir = 'headImage/';
							let images = await NativeModules.YOSS.requestOSS([result.uri], ossDir);
							this.setState({ headImg: images[0] });
							// console.log(this.state.headImg);
						}
					}).catch(error => {
						Alert.alert(
							null,
							'您还没有开启相机权限!\n请在设置中打开相机权限',
							[
								{ text: '确定', onPress: () => console.log('OK') },
							],
							{ cancelable: false }
						);
					});
				} else {
					let result = await ImagePicker.launchCameraAsync({
						allowsEditing: true,
						base64: true,
						aspect: [4, 3],
					});
					if (!result.cancelled) {
						let ossDir = 'headImage/';
						let images = await NativeModules.YOSS.requestOSS([result.uri], ossDir);
						this.setState({ headImg: images[0] });
						// console.log(this.state.headImg);
					}
				}

			}
			if (BUTTONS[index] === '选择相册') {
				let result = await ImagePicker.launchImageLibraryAsync({
					allowsEditing: true,
					base64: true,
					aspect: [4, 3],
				});
				// console.log(result.base64);
				if (!result.cancelled) {
					// oss图片转换
					let ossDir = 'headImage/';
					let images = await NativeModules.YOSS.requestOSS([result.uri], ossDir);
					this.setState({ headImg: images[0] });
				}
			}
		});
	}
	// 老用户存在城市省区数据不全，导致截取报错
	add_selectedArea() {
		let add_vule = this.state.selectedArea.substring(0, 6);
		if (typeof (add_vule) === "undefined") {
			return '';
		} else {
			return add_vule;
		}
	}
	add_selectedCity() {
		let add_vule = this.state.selectedCity.substring(0, 5);
		if (typeof (add_vule) === "undefined") {
			return '';
		} else {
			return add_vule;
		}
	}

	render() {
		if (this.state._cityShow) {
			return this.cityMain();
		} else {

			return (
				<Container style={styles.mainCont} >
					<Nav title='个人信息' rightComponent={this.headerRight()}></Nav>
					<Content style={this.state.onFocus && platform !== 'ios' ? styles.mainfocus : null}>
						<List>
							<ListItem style={styles.mainone} onPress={() => this.sheet()}>
								<Text style={styles.text}>头像</Text>
								<View style={styles.mainRight}>
									<Image
										onPress={() => this.sheet()}
										size={250}
										source={this.state.headImg ? { uri: this.state.headImg } : moheadImg}
										style={styles.leftImg} />
									<YIcon name="arrow-right" style={styles.arrowRight} />
								</View>
							</ListItem>

							<ListItem style={styles.mainListNIck}>
								<Text style={styles.text}>昵称</Text>
								<View style={styles.mainRight}>
									<Form>
										<Input onChangeText={this.NickonEndEditing.bind(this)} autoCorrect maxLength={10} style={styles.mainNickInput} placeholder="请输入昵称" value={this.state.nickName} />
									</Form>
									<YIcon name="arrow-right" style={styles.arrowRight} />
								</View>
							</ListItem>

							<ListItem style={[styles.mainList, styles.mainline]} onPress={this._sexClick.bind(this)}>
								<Text style={styles.text}>性别</Text>
								<View style={styles.mainRight}>
									<Text style={styles.textColor}>{this.state.sex}</Text>
									<YIcon name="arrow-right" style={styles.arrowRight} />
								</View>
							</ListItem>

							<ListItem style={styles.mainList} onPress={() => this._cityClick(this.state.selectedProvince)}>
								<Text style={styles.text}>地区</Text>
								<View style={styles.mainRight}>

									{this.state.selectedProvince ? <Text style={styles.textColor}>{this.state.selectedProvince}</Text> : null}
									{this.state.selectedCity ? <Text style={styles.textColor}>{this.state.selectedCity ? this.add_selectedCity() : null}</Text> : null}

									{this.state.selectedArea ? <Text style={styles.textColor}>{this.state.selectedArea ? this.add_selectedArea() : null}</Text> : null}

									<YIcon name="arrow-right" style={styles.arrowRight} />
								</View>
							</ListItem>

							<ListItem style={styles.mainEnd}>
								<Text style={styles.mainEndTitle}>个人简介</Text>
								<Textarea onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} maxLength={30} onChangeText={this.onChange.bind(this)} style={styles.mainEndInput} placeholder="还没有任何个人介绍" value={this.state.userSign}> </Textarea>
								<View style={styles.mainEndRight}>
									<Text style={styles.maxText}>
										<Text style={[styles.maxText, styles.userSigntext]}>{this.state.maxText || this.state.userSign.length}</Text>
										/30
									</Text>
								</View>
							</ListItem>

						</List>
					</Content>
				</Container >

			);

		}

	}
}
const styles = StyleSheet.create({
	haderTitle: {
		color: "#ff6f6b",
		width: transformSize(200),
		textAlign: 'right'
	},
	List: {
		width: '100%',
		marginLeft: 0,
		marginRight: 0,
		paddingLeft: transformSize(50),
		paddingRight: transformSize(50),
		height: transformSize(180),
		marginTop: transformSize(1),
		justifyContent: 'space-between',
	},
	ListLine: {
		borderBottomWidth: 0,
	},
	mainCont: {
		backgroundColor: '#F8F8F8'
	},
	mainone: {
		flex: 1,
		justifyContent: 'space-between',
		marginLeft: 0,
		marginRight: 0,
		paddingLeft: transformSize(50),
		paddingTop: transformSize(65),
		paddingBottom: transformSize(62),
		paddingRight: transformSize(44),
		borderBottomWidth: 2 / PixelRatio.get(),
		borderBottomColor: '#e3e3e3',
	},
	mainList: {
		flex: 1,
		justifyContent: 'space-between',
		marginLeft: 0,
		marginRight: 0,
		paddingTop: transformSize(65),
		paddingBottom: transformSize(60),
		paddingLeft: transformSize(50),
		paddingRight: transformSize(44),
		borderBottomWidth: 0
	},
	mainline: {
		borderTopWidth: 0,
		borderBottomWidth: 2 / PixelRatio.get(),
		borderBottomColor: '#e3e3e3',
	},
	mainListNIck: {
		flex: 1,
		justifyContent: 'space-between',
		height: transformSize(190),
		marginLeft: 0,
		marginRight: 0,
		paddingLeft: transformSize(50),
		paddingRight: transformSize(44),
		borderBottomWidth: 2 / PixelRatio.get(),
		borderBottomColor: '#e3e3e3',
	},
	mainNickInput: {
		width: transformSize(600),
		textAlign: 'right',
		color: '#666',
		flexDirection: 'row-reverse',
		margin: 0,
		padding: 0,
		fontSize: transformSize(46)
	},
	mainEnd: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginLeft: 0,
		marginRight: 0,
		paddingLeft: transformSize(50),
		paddingTop: transformSize(65),
		paddingBottom: transformSize(60),
		marginTop: transformSize(30),
		paddingRight: transformSize(44),
		borderBottomWidth: 0
	},
	mainEndTitle: {
		fontSize: transformSize(56),
		width: '100%',
	},
	text: {
		fontSize: transformSize(56),
		color: '#000'
	},
	maxText: {
		fontSize: transformSize(46),
		fontWeight: '400',
		color: '#999'
	},
	userSigntext: {
		color: '#666'
	},
	mainEndInput: {
		width: '100%',
		padding: 0,
		paddingLeft: transformSize(-100),
		color: '#666',
		fontSize: transformSize(46)

	},
	mainEndRight: {
		flex: 3,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'flex-end'
	},
	mainRight: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	leftImg: {
		width: transformSize(200),
		height: transformSize(200),
		borderRadius: transformSize(100),
		marginRight: transformSize(10),
	},
	Radio: {
		width: transformSize(60),
		height: transformSize(60),
		backgroundColor: '#ff6f6b',
		borderColor: '#ff6f6b',
		borderWidth: transformSize(2),
		borderRadius: transformSize(30),
		marginRight: transformSize(20)
	},
	textColor: {
		color: '#666',
		paddingLeft: transformSize(15),
		paddingRight: transformSize(15),
		fontSize: transformSize(46)
	},
	arrowRight: {
		fontSize: transformSize(46),
		color: '#bfbfbf',
		flex: 0,
		marginTop: transformSize(5)
	},
	segmentation: {
		// marginLeft: transformSize(50),
		// marginRight: transformSize(50),
		height: transformSize(2),
		backgroundColor: "#ccc"
	},
	mainfocus: {
		position: 'relative',
		top: transformSize(-320),
		left: 0
	}
});