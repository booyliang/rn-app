import React from 'react';
import {
	StyleSheet
} from 'react-native';
import {
	View,
	H1,
	Text,
	Button,
	YIcon,
	Image,
	Nav,
} from '@components';
import {
	tranformNum
} from '@utils';
import styles from '@styles';
import {
	YCommon
} from '@ydk';
import Logo from '../components/Logo';
import crown from '@assets/images/crown.png';

function renderCover() {
	const data = this.state.data;

	const categories = (data.classifys || []).map((category) =>
		<Text key={category.id} style={style.category}> {category.classifyName} </Text>
	);

	const store = stores[YCommon.channel];
	const storeLogo = store ? <YIcon name={store.logo} style={style.downloadTriggerLogo} /> : null;

	return (
		<View style={[style.cover, { marginTop: this.state.scrollDirection === 'down' ? -this.tabsOffsetY : 0 }]}>
			<Logo uri={data.appliIcon} style={style.logo} />
			<H1 style={style.name}>{data.appliName}</H1>
			<View style={style.metaWrapper}>
				<Button onPress={this.download} style={style.download}>
					<View style={style.downloadPart}>
						<Text style={style.heatText}>{tranformNum(data.appStatictis.downloadCount)} 次</Text>
						<View style={style.downloadSplit}></View>
					</View>
					<View style={[style.downloadPart, style.downloadTrigger]}>
						{storeLogo}
						<Text style={style.downloadTriggerText}>获取</Text>
					</View>
				</Button>
				<View style={style.meta}>
					<Text style={style.categories}>{categories}</Text>
					<View style={style.author}>
						{data.crownAuthorityFlag === 1 && <Image source={crown} style={style.authorCrown} />}
						<Text style={style.authorName}>{data.companyName}</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

function renderHead() {
	const data = this.state.data;
	const title = this.state.scrollDirection === 'down'
		? <Image source={{ uri: data.appliIcon }} style={style.navLogo} />
		: null;
	const downloadTrigger = this.state.scrollDirection === 'down'
		? (
			<Button transparent onPress={this.download} style={style.navRightButton}>
				<YIcon name="download" style={style.navRightIcon} />
			</Button>
		)
		: null;
	const right = (
		<View style={style.navRight}>
			{downloadTrigger}
			<Button transparent onPress={this.share} style={style.navRightButton}>
				<YIcon name="share-menu" style={style.navRightIcon} />
			</Button>
		</View>
	);
	return <Nav bodyComponent={title} rightComponent={right} style={style.nav}></Nav>;
}

const stores = {
	'YRYZAPP-HW': {
		logo: 'hewei'
	},
	'YRYZAPP-OPPO': {
		logo: 'OPPO'
	},
	'YRYZAPP-VIVO': {
		logo: 'vivo'
	},
	'YRYZAPP-XM': {
		logo: 'mi'
	},
	'YRYZAPP-MZ': {
		logo: 'meizu'
	},
	'YRYZAPP-YYB': {
		logo: 'yinyongbao'
	},
	'YRYZAPP-BD': {
		logo: 'baidu'
	},
	'YRYZAPP-360': {
		logo: 'three-six-zero'
	},
	'YRYZAPP-WDJ': {
		logo: 'pea'
	},
	'YRYZAPP-AS': {
		logo: 'appstore'
	},
};

const downloadHeight = styles.transformSize(132);
const style = StyleSheet.create({
	nav: {
		borderBottomWidth: 0
	},
	navLogo: {
		...styles.border,
		width: styles.transformSize(100),
		height: styles.transformSize(100),
		borderRadius: styles.transformSize(15),
	},
	navRight: {
		...styles.inlineWrap
	},
	navRightButton: {
		...styles.padder
	},
	navRightIcon: {
		fontSize: styles.transformSize(70),
		color: styles.themeColor
	},
	cover: {
		alignItems: 'center',
		paddingTop: 0,
		paddingHorizontal: styles.toPercent(90),
		marginBottom: styles.transformSize(85)
	},
	logo: {
		marginBottom: styles.transformSize(40)
	},
	name: {
		fontSize: styles.transformSize(72),
		marginBottom: styles.transformSize(40)
	},
	download: {
		...styles.round,
		alignSelf: 'center',
		alignItems: 'stretch',
		zIndex: 1,
		height: downloadHeight,
		paddingTop: 0,
		paddingBottom: 0,
		overflow: 'hidden',
	},
	downloadPart: {
		justifyContent: 'center',
		paddingHorizontal: styles.transformSize(48),
		backgroundColor: 'transparent'
	},
	heatText: {
		fontSize: styles.transformSize(48),
		color: '#ffe1a7'
	},
	downloadSplit: {
		position: 'absolute',
		right: 0,
		top: 0,
		bottom: 0,
		borderWidth: 0.5,
		borderStyle: 'dashed',
		borderColor: 'rgba(0, 0, 0, 0.05)',
	},
	downloadTrigger: {
		...styles.inlineWrap,
		...styles.centerWrap,
	},
	downloadTriggerLogo: {
		fontSize: styles.transformSize(66),
		color: 'white',
		marginRight: styles.transformSize(18)
	},
	downloadTriggerText: {
		fontWeight: 'bold',
		fontSize: styles.transformSize(56),
		color: 'white'
	},
	metaWrapper: {
		alignSelf: 'stretch',
	},
	meta: {
		alignItems: 'center',
		backgroundColor: styles.backgroundColor,
		paddingTop: styles.transformSize(106),
		paddingBottom: styles.transformSize(45),
		borderRadius: styles.transformSize(25),
		marginTop: -downloadHeight / 2,
	},
	categories: {
		marginBottom: styles.transformSize(20)
	},
	category: {
		fontSize: styles.transformSize(44),
		color: '#333',
		marginHorizontal: styles.transformSize(17),
	},
	author: {
		...styles.inlineWrap,
		...styles.centerWrap,
	},
	authorCrown: {
		width: styles.transformSize(62),
		height: styles.transformSize(48),
		marginRight: styles.transformSize(16),
		overlayColor: 'transparent'
	},
	authorName: {
		fontSize: styles.transformSize(40),
		color: styles.textAssistColor
	},
});

export {
	renderCover,
	renderHead,
};
export default {
	renderCover,
	renderHead,
};