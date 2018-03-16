import React from 'react';
import { StyleSheet, Linking, Clipboard, Platform, PixelRatio } from 'react-native';
import {
	Content, Container,
	Text,
	View,
	Touchable,
	Nav,
	withUser,
	withNavigation,
	Toast, FlatList,
} from '../../components';
import { YIcon } from '../../assets';
import { transformSize } from '../../styles';
import { YShareSDK } from '@ydk';
@withNavigation
export default class Setting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					icon: 'qq',
					name: 'QQ',
					sing: '2904462830',
					iconcolor: '#77bff7'
				},
				{
					icon: 'wechat',
					name: '微信',
					sing: 'yryz77',
					iconcolor: '#78e9da'
				},
				{
					icon: 'mail',
					name: '邮箱',
					sing: 'service@yryz.com',
					iconcolor: '#eda8f5'
				},
				{
					icon: 'phone1',
					name: '座机',
					sing: '400-0585-377',
					iconcolor: '#b5b7fb'
				}
			]
		};
	}

	componentDidMount() {

	}



	render() {
		return (
			<Container style={styles.contMain}>
				<Nav title='联系我们'></Nav>
				<Content>
					<FlatList
						data={this.state.data}
						renderItem={this.renderItem}
						keyExtractor={this._keyExtractor}
						ItemSeparatorComponent={() => <View style={styles.line}></View>}
					/>
					<View style={styles.segmentation}></View>
				</Content>

			</Container>
		);
	}
	_keyExtractor = (item, index) => index;
	renderItem = (item, index) => {
		return (
			<Touchable type="highlight" onPress={() => this.phoneCall(item)}>
				<View style={styles.mainLIst}>
					<View style={styles.mainLeft}>
						<YIcon style={{ fontSize: transformSize(56), paddingRight: transformSize(35), color: item.item.iconcolor }} name={item.item.icon} />
						<Text style={styles.text}>{item.item.name}</Text>
					</View>
					<View style={styles.mainLeft}>
						<Text style={styles.textright}>{item.item.sing}</Text>
						<YIcon name="arrow-right" style={styles.arrowRight} />
					</View>
				</View>

			</Touchable>
		);
	}
	_setClipboardContent = async (item) => {
		Clipboard.setString(item.sing);
		try {
			var content = await Clipboard.getString();
			if (item.icon == 'mail') {
				Toast.show({ text: '复制成功，小悠随时等候您的邮件~' });
				return;
			}
			if (item.icon == 'wechat') {
				Toast.show({ text: '复制成功，小悠随时在微信等您~' });
				return;
			}
			// if (item.icon == 'QQ') {
			// 	Toast.show({ text: '复制成功，小悠随时在QQ等您~' });
			// 	return;
			// }


		} catch (e) {
			console.log(e);
		}
	};
	async phoneCall(item) {
		if (item.item.name == '座机') {
			let url = 'tel:4000585377';
			Linking.canOpenURL(url).then(supported => {
				console.log(supported);
				if (!supported) {
					console.log('Can\'t handle url: ' + url);
				} else {
					return Linking.openURL(url);
				}
			}).catch(() => { Toast.show({ text: '您已取消呼叫小悠~' }); });
		} else if (item.item.name == 'QQ') {
			if (await YShareSDK.isClientInstalled('qq')) {
				let url = Platform.select({
					'ios': "mqq://im/chat?chat_type=wpa&uin=2904462830&version=1&src_type=web",
					'android': "mqqwpa://im/chat?chat_type=wpa&uin=2904462830"
				});
				Linking.canOpenURL(url).then(supported => {
					console.log(supported);
					if (!supported) {
						console.log('Can\'t handle url: ' + url);
					} else {
						return Linking.openURL(url);
					}
				}).catch(() => { Toast.show({ text: '您已取消联系小悠~' }); });

			} else {
				Toast.show({ text: '您还没有安装QQ~' });
			}


		} else {
			this._setClipboardContent(item.item);
		}

	}
}

const styles = StyleSheet.create({
	contMain: {
		backgroundColor: '#fff'
	},
	touchable: {
		width: '100%',
	},
	mainLIst: {
		flex: 1,
		flexDirection: 'row',
		height: transformSize(180),
		justifyContent: 'space-between',
		marginLeft: 0,
		marginRight: 0,
		// paddingTop: transformSize(65),
		// paddingBottom: transformSize(65),
		paddingLeft: transformSize(50),
		paddingRight: transformSize(50),
		borderBottomWidth: 0,
		backgroundColor: '#fff'
	},
	mainLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',

	},
	line: {
		marginLeft: transformSize(50),
		marginRight: transformSize(50),
		height: 2 / PixelRatio.get(),
		backgroundColor: "#eaeaea"
	},
	yicon: {
		paddingRight: transformSize(35)
	},
	text: {
		fontSize: transformSize(56),
		color: '#000'
	},
	textright: {
		fontSize: transformSize(50),
		color: '#000',
		marginRight: transformSize(20),
	},
	arrowRight: {
		fontSize: transformSize(46),
		color: '#bfbfbf',
		flex: 0,
		marginTop: transformSize(5)
	},
	segmentation: {
		marginLeft: transformSize(50),
		marginRight: transformSize(50),
		height: 2 / PixelRatio.get(),
		backgroundColor: "#eaeaea"
		// borderBottomWidth: 1,
		// borderBottomColor: "#ccc"
	},
});