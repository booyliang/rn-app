/**
 * Created by fanliang on 17/10/27.
 */

import React from 'react';
import {
	View,
	Dimensions,
	StyleSheet,
	ImageBackground
} from 'react-native';
import { transformSize } from "@styles";
import * as utils from "@utils";
import LottiePage from './LottiePage';
import Swiper from 'react-native-swiper';
import { SvgView, YIcon, Touchable } from '../../base';
import font1svg from './assets/font1svg';
import font2svg from './assets/font2svg';
import font3svg from './assets/font3svg';
import entersvg from './assets/entersvg';
let bg1 = require('./assets/1-bg.png');
let bg2 = require('./assets/2-bg.png');
let bg3 = require('./assets/3-bg.png');
export default class TransitionPage extends React.Component {

	componentDidMount() {


	}

	componentWillUnmount() {
	}


	handleIndexChanged = (index) => {
		let lottiePage = this['lottie' + (index + 1)];


		lottiePage && lottiePage.play();
	}
	handleLayout = () => {
		this.handleIndexChanged(0);

	}

	renderPagination = (index) => {
		if (index === 2) {
			return (
				<Touchable activeOpacity={1} onPress={this.props.onPress} style={styles.buttonWarp}>
					<SvgView svgXmlData={entersvg} style={styles.enter} />
				</Touchable>
			);
		};
		if (index === 0) {
			return (
				<View style={styles.docWarp}>
					<YIcon name="ellipse" style={{ fontSize: 20, color: '#ff6c5f', marginLeft: 13 }} />
					<YIcon name="circle" style={{ fontSize: 11, color: '#ffb4ae', marginLeft: 13 }}
					/>
					<YIcon name="circle" style={{ fontSize: 11, color: '#ffb4ae', marginLeft: 13 }}
					/>
				</View>);
		};
		if (index === 1) {
			return (
				<View style={styles.docWarp}	>
					<YIcon name="circle" style={{ fontSize: 11, color: '#ffdca8', marginLeft: 13 }}
					/>
					<YIcon name="ellipse" style={{ fontSize: 20, color: '#ffb952', marginLeft: 13 }} />

					<YIcon name="circle" style={{ fontSize: 11, color: '#ffdca8', marginLeft: 13 }}
					/>
				</View>
			);
		}

	}
	render() {
		return (
			<Swiper style={styles.wrapper} loop={false} showsButtons={false}
				onIndexChanged={this.handleIndexChanged} showsPagination={true}
				renderPagination={this.renderPagination}
				dot={[styles.dot, ]}
				activeDot={styles.activeDot}

			>
				<ImageBackground source={bg1} style={{ flex: 1 }}>
					<View style={styles.slide} onLayout={this.handleLayout}>
						<SvgView svgXmlData={font1svg} style={styles.font1} />
						<LottiePage ref={(l) => this.lottie1 = l} source={require('./assets/lottie1.json')}
							style={styles.lottie1} />
						{/* <View style={styles.docWarp}>
							<YIcon name="ellipse" style={{ fontSize: 20, color: '#ffa391', marginLeft: 13 }} />
							<YIcon name="circle" style={{ fontSize: 11, color: '#ffcdc4', marginLeft: 13 }}
							/>
							<YIcon name="circle" style={{ fontSize: 11, color: '#ffcdc4', marginLeft: 13 }}
							/>
						</View> */}
					</View>
				</ImageBackground>
				<ImageBackground source={bg2} style={{ flex: 1 }}>
					<View style={styles.slide}>
						<SvgView svgXmlData={font2svg} style={styles.font2} />
						<LottiePage ref={(lot) => this.lottie2 = lot} source={require('./assets/lottie2.ios.json')} style={styles.lottie2} />
						{/* <View style={styles.docWarp}	>
							<YIcon name="circle" style={{ fontSize: 11, color: '#c4ccff', marginLeft: 13 }}
							/>
							<YIcon name="ellipse" style={{ fontSize: 20, color: '#aeb3ff', marginLeft: 13 }} />

							<YIcon name="circle" style={{ fontSize: 11, color: '#c4ccff', marginLeft: 13 }}
							/>
						</View> */}
					</View>
				</ImageBackground>
				<ImageBackground source={bg3} style={{ flex: 1 }}>
					<View style={styles.slide}>
						<SvgView svgXmlData={font3svg} style={styles.font3} />
						<LottiePage ref={(lot) => this.lottie3 = lot} source={require('./assets/lottie3.json')} style={styles.lottie3} />
					</View>
				</ImageBackground>
			</Swiper>
		);
	}
}

const baseWidth = 1240;

const { width } = Dimensions.get('window');
function getFinalHeight(designHeight) {
	let height = Number.parseInt(designHeight * width / baseWidth);
	return height;
}
function getFinalWidth(designWidth) {
	let height = Number.parseInt(designWidth * width / baseWidth);
	return height;
}

const styles = StyleSheet.create({
	wrapper: {
		// backgroundColor: '#fff', width, height
	},
	slide: {
		flex: 1,
		paddingTop: utils.isIphoneX() ? 110 : 90,
		alignItems: 'center',
	},
	image: {
		width,
		flex: 1
	},
	lottie1: {
		width: width,
		height: getFinalHeight(1680)
	},
	lottie2: {
		width: width,
		height: getFinalHeight(1200)
	},
	lottie3: {
		justifyContent: 'center',
		alignItems: 'center',
		width: width,
		height: getFinalHeight(1200)
	},
	font1: {
		// paddingLeft: 34,
		marginBottom: utils.isIphoneX() ? 30 : 0,
		width: getFinalWidth(966),
		height: getFinalHeight(84)
	},
	font2: {
		// paddingLeft: 34,
		marginBottom: utils.isIphoneX() ? 85 : 45,
		width: getFinalWidth(972),
		height: getFinalHeight(84)
	},
	font3: {
		// paddingLeft: 34,
		marginBottom: utils.isIphoneX() ? 90 : 50,
		width: getFinalWidth(1100),
		height: getFinalHeight(84)
	},
	buttonWarp: {
		position: "absolute",
		bottom: transformSize(148),
		left: 0,
		right: 0,
		alignItems: 'center',
	},
	docWarp: {
		flexDirection: 'row',
		width: width,
		position: "absolute",
		bottom: transformSize(111),
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	enter: {
		width: getFinalWidth(412),
		height: getFinalHeight(117)
	},
	dot: {
		fontSize: 11,
		color: '#ffa391',
		marginLeft: 13
	},
	activeDot: {
		fontSize: 20,
		color: '#ffa391',
		marginLeft: 13
	},
});
// AppRegistry.registerComponent('rn01', () => myapp);