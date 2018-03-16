import {
	StyleSheet,
	StatusBar, Platform, Dimensions
} from 'react-native';
import {
	transformSize,
} from './utils';
const themeColor = '#ff6f6b';
const assistColor = '#ff9160';
const assistColor1 = '#36dbb9';
const errorColor = '#fb4545';
const textPrimaryColor = 'black';
const textPrimaryColor1 = '#333';
const textSecondaryColor = '#666';
const textAssistColor = '#999';
const placeholderColor = '#a8a8a8';
const borderColor = '#e3e3e3';
const backgroundColor = '#f8f8f8';
const activeMaskBackgroundColor = 'rgba(0, 0, 0, 0.1)';
const goldenRatio = 0.6180339887;
const titleSize = transformSize(62);
const titleWeight = "600";
const iconSize = transformSize(50);
const padding = transformSize(50);
const tabFontSize = transformSize(56);
const statusBarHeight = StatusBar.currentHeight || 0;

const isIphoneX = ( this.screenWidth === 375 && this.screenHeight === 812 );

const listHeader = {
	fontSize: transformSize(56),
	fontWeight: titleWeight,
};
const helpText = {
	fontSize: transformSize(44),
	color: '#999',
};
const border = {
	borderWidth: 0.5,
	borderColor
};
const borderLeft = {
	borderLeftWidth: 0.5,
	borderLeftColor: borderColor
};
const borderRight = {
	borderRightWidth: 0.5,
	borderRightColor: borderColor
};
const borderTop = {
	borderTopWidth: 0.5,
	borderTopColor: borderColor
};
const borderBottom = {
	borderBottomWidth: 0.5,
	borderBottomColor: borderColor
};
const inlineWrap = {
	flexDirection: 'row'
};
const antiBlock = {
	alignSelf: 'flex-start'
};
const padder = {
	paddingHorizontal: padding
};
const round = {
	borderRadius: 999
};
const full = StyleSheet.absoluteFillObject;
const maskBackground = {
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
};
const centerWrap = {
	justifyContent: 'center',
	alignItems: 'center',
};

export {
	themeColor,
	assistColor,
	assistColor1,
	errorColor,
	textPrimaryColor,
	textPrimaryColor1,
	textSecondaryColor,
	textAssistColor,
	placeholderColor,
	borderColor,
	backgroundColor,
	activeMaskBackgroundColor,
	goldenRatio,
	border,
	borderLeft,
	borderRight,
	borderTop,
	borderBottom,
	inlineWrap,
	titleSize,
	titleWeight,
	antiBlock,
	iconSize,
	helpText,
	listHeader,
	padding,
	padder,
	round,
	full,
	maskBackground,
	centerWrap,
	tabFontSize,
	statusBarHeight,
};
export default {
	themeColor,
	assistColor,
	assistColor1,
	errorColor,
	textPrimaryColor,
	textPrimaryColor1,
	textSecondaryColor,
	textAssistColor,
	placeholderColor,
	borderColor,
	backgroundColor,
	activeMaskBackgroundColor,
	goldenRatio,
	border,
	borderLeft,
	borderRight,
	borderTop,
	borderBottom,
	inlineWrap,
	titleSize,
	titleWeight,
	antiBlock,
	iconSize,
	helpText,
	listHeader,
	padding,
	padder,
	round,
	full,
	maskBackground,
	centerWrap,
	tabFontSize,
	statusBarHeight,
	get screenHeight() {
		return Dimensions.get('window').height;
	},
	get screenWidth() {
		return Dimensions.get('window').width;
	},
	// 首页iphoneX height
	get homeTabBottonHeight() {
		if (Platform.OS === "ios" && this.screenWidth === 375 && this.screenHeight === 812) {
			return 72;
		} else {
			return 52;
		}
	},
	// 专题返回箭头iphoneX top
	get subjectHomeArrow() {
		if (Platform.OS === "ios" && this.screenWidth === 375 && this.screenHeight === 812) {
			return transformSize(150);
		} else {
			return transformSize(100);
		}
	},
	// 文章底部添加iphoneX paddingBottom
	get artionBarBottomPadding() {
		if (Platform.OS === "ios" && this.screenWidth === 375 && this.screenHeight === 812) {
			return transformSize(48);
		} else {
			return 0;
		}
	}
};