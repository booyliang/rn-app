import React from 'react';
import { StyleSheet, PixelRatio } from 'react-native';
import {
	Content, Container,
	Right,
	Button,
	Text,
	ListItem,
	View,
	Nav,
	List,
	withUser,
	withNavigation,
	Toast,
} from '../../components';
import { YIcon } from '../../assets';
import { transformSize } from '../../styles';
import { sign } from '../../services';
import { YCommon } from '@ydk';
import { connect } from 'react-redux';
let mapStateToProps = (state) => {
	return {
		attdata: state.attention,
		wikedata: state.wike,
	};
};
let device = {};
YCommon.getDeviceInfo().then((res) => {
	device = res;
});

@withNavigation
@connect(mapStateToProps)
export default class Setting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showText: '0 M',
		};
	}

	componentDidMount() {
		YCommon.getCacheSize().then((cacheInfo) => {
			if (cacheInfo.cacheSize > 0) {
				let cachebytes = this.bytesToSize(JSON.stringify(cacheInfo.cacheSize));
				if (cachebytes) {
					this.setState({
						showText: cachebytes
					});
				}
			}
		});
	}
	bytesToSize(bytes) {
		if (bytes == 0) return '0 B';
		var k = 1024;
		sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		i = Math.floor(Math.log(bytes) / Math.log(k));
		return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
		// toPrecision(3) 后面保留一位小数，如1.0GB                                                                                              //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
	}


	render() {
		return (
			<Container style={styles.contMain}>
				<Nav title='设置'></Nav>
				<Content>
					<List style={styles.mains}>
						{/* <ListItem
							onPress={this.signUp.bind(this)}
							style={styles.mainLIst}>
							<Text>绑定手机</Text>
							<YIcon name="arrow-right" style={styles.arrowRight} />
						</ListItem> */}

						<ListItem onPress={this.signUp.bind(this)} style={styles.mainLIst}>
							<Text style={styles.text}>修改密码</Text>
							<YIcon name="arrow-right" style={styles.arrowRight} />
						</ListItem>
						<View style={styles.segmentation}></View>

						<ListItem
							style={[styles.mainLIst, styles.mainline]}
							onPress={this.clear.bind(this)}>
							<Text style={styles.text}>清空缓存</Text>
							<View style={styles.mainRight}>
								<Text style={styles.mainLIstText}>{this.state.showText}</Text>
								<YIcon name="arrow-right" style={styles.arrowRight} />
							</View>
						</ListItem>
						<View style={styles.segmentation}></View>

						<ListItem style={[styles.mainLIst, styles.oldlist]}>
							<Text style={styles.text}>当前版本</Text>
							<Right><Text style={styles.mainLIstText}>{device.appVersion}</Text></Right>
						</ListItem>

					</List>
					{this.uotbotton()}
				</Content>

			</Container>
		);
	}
	clear() {
		// Toast.show({text: '开始清除'})
		YCommon.clearCache().then(() => {
			Toast.show({ text: '清除成功' });
			this.setState({
				showText: '0 M'
			});
		});
	}
	uotbotton() {
		if (sign.isIn()) {
			return (
				// <Button style={styles.button} block}><Text>退出登录</Text></Button>
				<ListItem style={[styles.mainLIst, styles.bottonlist]} onPress={this.signOut.bind(this)} >
					<Text style={{
						alignSelf: 'center', textAlign: 'center', width: '100%', color: '#000',
						fontSize: transformSize(56)
					}}> 退出登录</Text>
				</ ListItem >
			);
		} else {
			return (
				null
			);
		}
	}
	signOut() {
		let signdata = [];
		this.props.dispatch({ type: 'CLEAR_WIKE', payload: signdata });
		this.props.dispatch({ type: 'CLEAR_ATTENTION', payload: signdata });
		this.props.navigation.goBack();
		sign.out();
	}
	signUp() {
		if (sign.isIn()) {
			sign.updatePassword();
		} else {
			sign.in();
		}

	}
}

const styles = StyleSheet.create({
	contMain: {
		// backgroundColor: '#f8f8f8',
	},
	mains: {
		backgroundColor: '#fff',
		marginBottom: transformSize(30),
	},
	mainLIst: {
		flex: 1,
		height: transformSize(185),
		justifyContent: 'space-between',
		marginLeft: 0,
		marginRight: 0,
		paddingLeft: transformSize(50),
		paddingRight: transformSize(50),
		borderBottomWidth: 0
		// paddingTop: transformSize(65),
		// paddingBottom: transformSize(65),
	},
	oldlist: {
		borderBottomWidth: 0,
		marginTop: transformSize(5)
	},
	mainline: {
		marginBottom: transformSize(2)
	},
	mainLIstRight: {
		flex: 2,
		justifyContent: 'center',
	},
	mainRight: {
		flexDirection: 'row'
	},
	arrowRight: {
		fontSize: transformSize(46),
		marginLeft: transformSize(0),
		marginTop: transformSize(5),
		color: '#999',
		flex: 0,
	},
	bottonlist: {
		width: '100%',
		alignItems: 'center',
		alignSelf: 'center'
	},
	text: {
		color: '#000',
		fontSize: transformSize(56)
	},
	mainLIstText: {
		paddingTop: transformSize(5),
		paddingRight: transformSize(10),
		color: '#999',
		textAlign: 'right',
		fontSize: transformSize(50)
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