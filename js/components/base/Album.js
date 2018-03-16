import React from 'react';
import {
	Modal,
	StyleSheet,
	Animated,
	LayoutAnimation,
	Alert,
	Platform,
	TouchableWithoutFeedback,
} from 'react-native';
import {
	View,
	Button,
	Text,
	YIcon,
	Touchable,
	Toast,
} from '@components';
import {
	navigate
} from '@services';
import Swiper from 'react-native-swiper';
import {
	YScaleImage,
	YCommon
} from '@ydk';
import styles from '@styles';

class Album extends React.Component {
	render() {
		const tempImage = this.state.tempImage;
		return (
			<Modal transparent animationType="fade" visible={this.state.opened} onRequestClose={this.close} onShow={this.handleShow}>
				<View style={s.container}>
					{/*<Animated.Image source={{uri: tempImage.uri}} style={[s.tempImage, tempImage.style]} />*/}
					{this.renderSwiper()}
					{this.state.menuOpened && this.renderMenu()}
				</View>
			</Modal>
		);
	}

	renderSwiper = () => {
		return this.state.swiperVisible && (
			<Swiper
				loop={false}
				bounces
				showsPagination={false}
				index={this.state.index}
				onIndexChanged={this.handleIndexChanged}
				style={s.swiper}
			>
				{this.renderSlides()}
			</Swiper>
		);
	};

	renderSlides = (image, index) => {
		return this.state.images.map((image, index) => (
			<View key={index} style={s.slide}>
			<TouchableWithoutFeedback onPress={this.openMenu}>	
				<YScaleImage source={{uri: image}} resizeMode="contain"  style={s.image} />
			</TouchableWithoutFeedback>
			</View>
		));
	};

	renderMenu = () => {
		return (
			<Touchable type="withoutFeedback" onPress={this.closeMenu}>
				<View style={s.menu}>
					<View style={s.menuTop}>
						<Button onPress={this.close} style={s.closeTrigger}>
							<YIcon name="arrow-back" style={s.closeTriggerIcon} />
						</Button>
					</View>
					<View style={s.menuBottom}>
						<Button transparent onPress={this.saveImage} style={s.menuItem}>
							<YIcon name="download-a" style={[s.menuItemText, s.menuItemIcon]} />
							<Text style={s.menuItemText}>保存</Text>
						</Button>
						{/*<Button transparent style={s.menuItem}>
							<YIcon name="share-menu" style={[s.menuItemText, s.menuItemIcon]} />
							<Text style={s.menuItemText}>分享</Text>
						</Button>*/}
						<Button transparent onPress={this.report} style={s.menuItem}>
							<YIcon name="light" style={[s.menuItemText, s.menuItemIcon]} />
							<Text style={s.menuItemText}>举报</Text>
						</Button>
					</View>
				</View>
			</Touchable>
		);
	};

	handleShow = () => {
		// Hack for bug in `ViewPagerAndroid`.
		setTimeout(() => {
			this.setState({
				swiperVisible: true
			});
		}, 0);
	};

	handleIndexChanged = (index) => {
		this.currentImage = this.state.images[index];
	};

	hideSwiper = () => {
		this.setState({
			swiperVisible: false
		});
	};

	open = (options) => {
		const {
			images,
			index,
			x,
			y,
			width,
			height
		} = options;
		this.setState({
			images,
			index,
			opened: true
		});
		this.handleIndexChanged(index);
		// this.setState({
		// 	opened: true,
		// 	tempImage: {
		// 		uri: images[index],
		// 		style: {
		// 			left: x,
		// 			top: y,
		// 			width,
		// 			height,
		// 			transform: [
		// 				{
		// 					translateX: new Animated.Value(0)
		// 				},
		// 				{
		// 					translateY: new Animated.Value(0)
		// 				},
		// 			]
		// 		}
		// 	}
		// }, () => {
		// 	this.zoomTempImage(x, y, width, height);
		// 	setTimeout(this.close, 2000);
		// });
	};

	close = () => {
		this.setState({
			opened: false,
			swiperVisible: false,
			menuOpened: false
		});
	};

	// zoomTempImage = (x, y, width, height) => {
	// 	const newX = (styles.screenWidth - width) / 2;
	// 	const newY = (styles.screenHeight - height) / 2;
	// 	const transform = this.state.tempImage.style.transform;
	// 	Animated.parallel([
	// 		this.createAnimation(transform[0].translateX, newX - x, 350),
	// 		this.createAnimation(transform[1].translateY, newY - y, 350),
	// 	]).start();
	// };

	// createAnimation = (variable, value, duration = 200) => {
	// 	return Animated.timing(variable, {
	// 		toValue: value,
	// 		duration,
	// 		useNativeDriver: true
	// 	});
	// };

	openMenu = () => {
		LayoutAnimation.easeInEaseOut();
		this.setState({
			menuOpened: true
		});
	};

	closeMenu = () => {
		LayoutAnimation.easeInEaseOut();
		this.setState({
			menuOpened: false
		});
	};

	saveImage = async () => {
		try {
			await YCommon.saveImage({
				uri: this.currentImage
			});
			const message = '保存成功';

			if (Platform.OS === 'ios') {
				Alert.alert('', message);
			} else {
				Toast.show(message);
			}
		} catch (error) {
			console.warn(error.message || JSON.stringify(error));
		}
	};

	report = () => {
		this.close();
		navigate('YWebView', {
			url: 'http://youranyizhi.mikecrm.com/jQuV4xR'
		});
	};

	state = {
		opened: false,
		images: [],
		tempImage: {},
		swiperVisible: false,
		menuOpened: false,
	};

	currentImage = '';

	static init(element) {
		Album.instance = element;
	}

	static open(options) {
		Album.instance.open(options);
	}

	static instance = null;
}

const s = StyleSheet.create({
	tempImage: {
		position: 'absolute'
	},
	container: {
		flex: 1,
		backgroundColor: 'black'
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	menu: {
		...styles.full,
		justifyContent: 'space-between'
	},
	menuTop: {
		...styles.padder,
		marginTop: styles.transformSize(80)
	},
	closeTrigger: {
		...styles.round,
		...styles.maskBackground,
		...styles.centerWrap,
		width: styles.transformSize(120),
		height: styles.transformSize(120),
	},
	closeTriggerIcon: {
		fontSize: styles.transformSize(54),
		color: 'white',
		left: styles.transformSize(-8)
	},
	menuBottom: {
		...styles.padder,
		...styles.inlineWrap,
		height: styles.transformSize(160),
		backgroundColor: '#333'
	},
	menuItem: {
		...styles.centerWrap,
		flex: 1,
		alignSelf: 'stretch',
		borderRadius: 0,
	},
	menuItemText: {
		color: 'white'
	},
	menuItemIcon: {
		fontSize: styles.transformSize(52),
		marginRight: styles.transformSize(20)
	}
});

export default Album;