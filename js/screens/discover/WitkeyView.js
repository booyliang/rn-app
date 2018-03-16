import React, { Component } from 'react';
import { StyleSheet, Linking,  NativeModules, LayoutAnimation, Platform} from "react-native";
import {
	Container, Content, Left, View,
	Text, Image, YIcon, Right, Touchable, H2, Button,
	withNavigation, HeadBar, Nav, ContentSource, Loading, withUser, ActionSheet,
	Toast, Dimensions, ScrollView
} from '@components';
import { transformSize, inlineWrap, antiBlock, centerWrap, padder, border } from '@styles';
import { http, sign, share } from '../../services';
import { cache } from './../../utils';
import ViewPager from './components/ViewPager';
import {
	Constants, YZhugeIo
} from '@ydk';
let { width } = Dimensions.get('window');
@withNavigation
@withUser(false)
export default class WitkeyDetail extends Component {
	constructor(props) {
		super(props);
		this.id = this.props.navigation.state.params.id;
		this.state = {
			showTitle: false,
		};
	}

	async attentionWitkey() {
		const detailData = this.props.detailData;
		if (!this.props.user.isSignIn) {
			sign.in();
			return;
		}
		if (detailData.followFlag === 1) {
			Toast.show({
				text: '您已关注该威客!',
			});
			return;
		}
		// 调用关注接口
		const url = `/services/app/v1/witkey/followWitkey/${detailData.id}/1`;
		const res = await http(url);
		const data = res.data;
		if (data.code === "200") {
			detailData.followFlag = data.data.followFlag;
			if (this.props.changeIcon) {
				this.props.changeIcon(detailData.id);
			}
			Toast.show({ text: '关注成功' });
		} else {
			Toast.show({ text: data.msg });
		}
		YZhugeIo.track('关注威客', {
			'威客名称': detailData.companyName,
		});
	}

	setFavoriteIcon(status) {
		const favoriteIcon = status === 1 ? "start" : "star-add";
		this.setState({ favoriteIcon });
	}

	openSheet() {
		const menu = [
			"分享",
			"举报",
			"取消",
		];
		ActionSheet.show({
			options: menu,
			cancelButtonIndex: 2,
		}, (index) => {
			index = Number(index);
			if (index === 0) {
				this.openShare();
			}
			else if (index === 1) {
				this.props.navigation.navigate('YWebView', {
					url: 'http://youranyizhi.mikecrm.com/jQuV4xR'
				});
			}
		}
		);
	}

	makingCall() {
		const detailData = this.props.detailData;
		let companyPhone = detailData.companyPhone;
		let length = companyPhone.length;
		let mantissa = companyPhone.substring(length - 4, length);
		let [a, b, c, d] = mantissa.split("");
		const phoneNumber = (companyPhone.substring(0, length - 4)) + d + c + b + a;
		let url = 'tel:' + phoneNumber;
		Linking.canOpenURL(url).then(supported => {
			if (!supported) {
				console.log('Can\'t handle url: ' + url);
			} else {
				return Linking.openURL(url);
			}
		}).catch(() => {
			Toast.show({
				text: '拨打已取消'
			});
		});
		YZhugeIo.track('拔打威客电话', {
			'公司名称': detailData.companyName,
			'电话号码': phoneNumber
		});
	}

	async openShare() {
		const detailData = this.props.detailData;
		await share.open({
			title: `${detailData.companyName}`,
			content: `${detailData.companyBref}`,
			image: `${detailData.companyLogo}`,
			url: `${Constants.webBaseUrl}/witkeyShare/${detailData.id}`
		});
		// 埋点
		if (NativeModules && NativeModules.zhugeIo) {
			const zhugeIo = NativeModules.YCommon;
			zhugeIo.track('分享', {
				'分享主题': detailData.title,
				'分享链接': `${Constants.webBaseUrl}/appShare/${detailData.id}`
			});
		}
	}

	renderCompanyDetail = (data) => {
		return (
			<View style={styles.wrapper}>
				<Image square source={{ uri: data.companyLogo }} style={styles.icon} />
				<H2 style={styles.title} >{data.companyName}</H2>
				<View style={inlineWrap}>
					<Left>
						<Text style={[styles.serviceText, styles.serviceInterval]} numberOfLines={1}>
							外包类型:  {data.outSourceName}
						</Text>
						<Text style={[styles.serviceText, styles.serviceInterval]} numberOfLines={3}>
							服务领域:  {data.commentValueName}
						</Text>
						<Text style={[styles.serviceText, styles.companyInterval]} numberOfLines={3}>
							公司性质:  {data.companyTypeName}
						</Text>
						<View style={styles.site}>
							<YIcon name="add-a-c" style={{ fontSize: transformSize(40), color: "#bfbfbf" }} />
							<Text style={styles.siteText}>{data.companyAddress}</Text>
						</View>
					</Left>
					<Right style={antiBlock}>
						<Touchable onPress={() => { this.makingCall(); }}>
							<View style={styles.linkWrapper}>
								<YIcon name="phone" style={styles.linkIcon} />
								<Text style={styles.linkText}>联系我</Text>
							</View>
						</Touchable>
					</Right>
				</View>
				<View>
					<View style={styles.priceWarp}>
						<Text style={styles.priceText}>价格:￥</Text>
						<Text style={styles.price}>{data.price}</Text>
					</View>
					<View>
						<Text style={styles.priceDesc}>(服务价格为参考，真实价格按实际需求定价)</Text>
					</View>
				</View>
			</View>
		);
	}

	renderTitleBar(title, style = {}) {
		return (
			<View style={[styles.titleBar, style]}>
				<HeadBar />
				<Text style={styles.titleText}>{title}</Text>
			</View>
		);
	}

	headerRight() {
		return (
			<View style={inlineWrap}>
				<Button transparent
					    style={styles.fevoriteIconWrap}
					onPress={
						() => {
							this.attentionWitkey();
						}
					}>
					<YIcon name={this.props.detailData.followFlag === 1 ? 'start' : 'star-add'} style={styles.favoriteIcon} />
				</Button>
				<Button
					transparent
					style={styles.moreIconWrap}
					onPress={() => {
						this.openSheet();
					}}>
					<YIcon name="more" style={styles.moreIcon} />
				</Button>
			</View>
		);
	}

	render() {
		const { showTitle } = this.state;
		const detailData = this.props.detailData;
		if (!detailData) {
			return (<View style={styles.body}>
				<Nav title={null} rightComponent={null} />
				<Loading />
			</View>);
		}
		let comName = detailData.companyName || '';
		return (
			<Container style={styles.page}>
				<Nav title={showTitle && comName} rightComponent={this.headerRight()} />
				<Content onScroll={this.handleScroll.bind(this)} scrollEventThrottle={16}
					    ref={(r) => this.refContent = r}
					style={styles.body} >
					{this.renderCompanyDetail(detailData)}
					<View style={[styles.wrapper, styles.serviceWrapper]}>
						{this.renderTitleBar("服务详情", styles.detailTileBar)}
						<ContentSource data={detailData.contentSource} style={styles.contentSource} />
						{this.renderTitleBar("服务资质", styles.qualificationsBar)}
						<View >
							<Image source={{ uri: detailData.serviceQualification }} style={styles.serviceQualification} />
						</View>
					</View>
				</Content>
			</Container>
		);
	}

	handleScroll(e) {
		const scrollY = e.nativeEvent.contentOffset.y;
		LayoutAnimation.easeInEaseOut();
		if (scrollY >= transformSize(440)) {
			this.setState({ showTitle: true });
		} else {
			this.setState({ showTitle: false });
		}
	}

}
const styles = StyleSheet.create({
	detailTileBar: {
		marginBottom: transformSize(24)
	},
	qualificationsBar: {
		marginBottom: transformSize(60)
	},
	page: {
		width
	},
	wrapper: {
		...padder,
		paddingVertical: transformSize(50),
		backgroundColor: "#fff"
	},
	body: {
		flex: 1,
		backgroundColor: '#f8f8f8',
		width: width,
	},
	contentSource: {
		marginBottom: transformSize(56)
	},
	icon: {
		alignSelf: "center",
		width: transformSize(250),
		height: transformSize(250),
		borderRadius: transformSize(40),
		overlayColor: '#fff',
		...border,
		marginBottom: transformSize(66)
	},
	title: {
		fontSize: transformSize(72),
		marginBottom: transformSize(52),
		color: 'black',
		textAlign: 'center'
	},
	phoneIcon: {
		fontSize: transformSize(46),
		color: "#2aba53"
	},
	serviceText: {
		color: "#666",
		fontSize: transformSize(43),
	},
	site: {
		...inlineWrap,
		alignItems: 'center',
		marginBottom: transformSize(70)
	},
	linkWrapper: {
		width: transformSize(200),
		height: transformSize(180),
		...centerWrap,
		borderLeftWidth: StyleSheet.hairlineWidth,
		borderLeftColor: "#e3e3e3"
	},
	siteText: {
		fontSize: transformSize(40),
		paddingLeft: transformSize(20),
		color: "#999"
	},
	linkIcon: {
		fontSize: transformSize(76),
		color: "#ff6f6b",
		marginBottom: transformSize(16)
	},
	linkText: {
		fontSize: transformSize(46),
		color: "#ff6f6b",
		textAlign: "center"
	},
	priceText: {
		fontSize: transformSize(56),
		color: 'black'
	},
	price: {
		fontSize: transformSize(80),
		alignSelf: 'flex-start',
		color: "#FF9160",
		fontWeight: "600",
	},
	priceDesc: {
		fontSize: transformSize(36),
		color: "#999",
		marginTop: transformSize(18)
	},
	introduceWrapper: {
		paddingVertical: transformSize(55),
		paddingHorizontal: transformSize(40),
		backgroundColor: "#f6f6f6",
		borderRadius: transformSize(30)
	},
	introduceText: {
		fontSize: transformSize(50),
	},
	serviceWrapper: {
		marginTop: transformSize(35),
	},
	titleBar: {
		...inlineWrap,
		alignItems: 'center',
	},
	titleText: {
		flex: 1,
		fontSize: transformSize(56),
		paddingLeft: transformSize(22),
		color: "#ff6f6b"
	},
	serviceInterval: {
		marginBottom: transformSize(22)
	},
	companyInterval: {
		marginBottom: transformSize(34)
	},
	serviceQualification: {
		height: transformSize(645),
		...border
	},
	favoriteIcon: {
		fontSize: transformSize(74),
		color: "#ff6f6b",
	},
	priceWarp: {
		...inlineWrap,
		alignItems: 'center'
	},
	moreIcon: {
		fontSize: transformSize(67)
	},
	moreIconWrap: {
		paddingVertical: transformSize(10),
		paddingRight: transformSize(50),
		paddingLeft: transformSize(25)
	},
	fevoriteIconWrap: {
		paddingVertical: transformSize(10),
		paddingLeft: transformSize(50),
		paddingRight: transformSize(25)
	}
});