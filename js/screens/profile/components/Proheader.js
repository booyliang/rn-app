import React from 'react';
import {
	StyleSheet
} from 'react-native';
import { transformSize } from '../../../styles';
import {
	Right,
	Button,
	Text,
	View,
	Touchable,
	Image,
	Left,
	Header,
	Title,
	Body,
	withNavigation,
	withUser
} from "../../../components";
import { sign } from '@services';
import { connect } from 'react-redux';
let mapStateToProps = (state) => {
	return {
		userdata: state.intro,
	};
};
@withNavigation
@withUser(false)
@connect(mapStateToProps)
export default class Proheader extends React.Component {

	constructor(props) {
		super(props);
		this.userData = null;
		this.state = {
			nickName: null,
			userSign: null,
			headImg: null
		};
	}
	render() {
		return (
			<View style={paint.headerbackground}>
				<Header style={paint.header}>
					<Left>
						<Button transparent>
						</Button>
					</Left>
					<Body>
						<Title style={paint.title}></Title>
					</Body>
					{/* {sign.isIn() ? <Right>
						<Touchable onPress={() => this.props.navigation.navigate('Intro')}>
							<Text style={paint.headertext}>编辑</Text>
						</Touchable>
					</Right> : null} */}

				</Header>
				{this.headermain()}
			</View >
		);
	}
	headermain() {
		if (sign.isIn()) {
			return (
				<Touchable onPress={this.clickRuoter.bind(this)}>
					<View style={paint.headerNav}>
						<Image
							style={paint.headerImage}
							source={this.headImg()}></Image>
						<View style={paint.body}>
							<Text style={paint.headerNavName}>{this.props.user.nickName}</Text>
							<View style={{ paddingHorizontal: transformSize(80), paddingVertical: transformSize(20) }}>
								<Text numberOfLines={3} style={paint.headerNavintro}>{this.props.user.userSign}</Text>
							</View>
						</View>
					</View>
				</Touchable>
			);
		} else {
			return (
				<Touchable onPress={this.clickRuoter.bind(this)}>
					<View style={paint.oldheaderNav}>
						<Image
							resizeMode={'stretch'}
							style={paint.nullImg} large
							source={require('../../../assets/images/default-avatar.png')}></Image>
						<Body style={paint.body}>
							<Text style={paint.headerNavName}>未登录</Text>
							<Text numberOfLines={1} style={paint.headerNavintro}>点击这里登录</Text>
						</Body>

					</View>
				</Touchable>
			);

		}
	}

	clickRuoter() {
		if (sign.isIn()) {
			this.props.navigation.navigate('Intro');
		} else {
			sign.in();
		}

	}
	headImg() {
		if (this.props.user.headImg) {
			return { uri: this.props.user.headImg };
		} else {
			return require('../../../assets/images/default-avatar.png');
		}
	}
};

const paint = StyleSheet.create({
	title: {
		fontSize: transformSize(62),
	},
	headerbackground: {
		width: '100%',
		backgroundColor: '#fff',
		// borderColor: '#e7e7e7',
		// borderBottomWidth: 3 / PixelRatio.get(),
		// paddingBottom: transformSize(30)

	},
	header: {
		height: transformSize(105),
		paddingTop: 0,
		backgroundColor: 'transparent',
		borderColor: 'transparent',
		borderBottomWidth: 0,
	},
	headerButton: {
		padding: 0,
		margin: 0
	},
	headertext: {
		color: '#a8a8a8',
		fontSize: transformSize(50),
		paddingRight: transformSize(50),
	},
	headerNav: {
		alignItems: 'center',
		alignSelf: 'center',
		// height: transformSize(550),
		// marginBottom: transformSize(10)
	},
	oldheaderNav: {
		alignItems: 'center',
		alignSelf: 'center',
		height: transformSize(530),
	},
	body: {
		alignItems: 'center',
		alignSelf: 'center'
	},
	headerImage: {
		width: transformSize(285),
		height: transformSize(285),
		borderRadius: transformSize(142.5),
		borderWidth: transformSize(20),
		borderColor: "#f1f1f1",
		overflow: 'hidden',
		resizeMode: 'cover'
	},
	nullImg: {
		width: transformSize(285),
		height: transformSize(285),
	},
	headerNavName: {
		fontSize: transformSize(68),
		paddingTop: transformSize(40),
		fontWeight: '400',
		// paddingBottom: transformSize(30),

	},
	headerNavintro: {
		color: '#2e2e2e',
		fontSize: transformSize(46),
		marginTop: transformSize(10)
	}
});