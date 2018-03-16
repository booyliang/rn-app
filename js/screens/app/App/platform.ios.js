import React from 'react';
import {
	StyleSheet
} from 'react-native';
import {
	View,
	H1,
	Button,
	YIcon,
	Nav,
	Image,
} from '@components';
import styles from '@styles';
import Logo from '../components/Logo';
import crown from '@assets/images/crown.png';

function renderHead() {
	const data = this.state.data;
	const title = this.state.scrollDirection === 'down'
		? data.companyName
		: '';
	const right = (
		<Button transparent onPress={this.share} style={style.navRightButton}>
			<YIcon name="share-menu" style={style.navRightIcon} />
		</Button>
	);
	return <Nav title={title} rightComponent={right} style={style.nav}></Nav>;
}

function renderCover() {
	const data = this.state.data;

	return (
		<View style={[style.cover, { marginTop: this.state.scrollDirection === 'down' ? -this.tabsOffsetY : 0 }]}>
			<H1 style={style.author}>{data.companyName}</H1>
			<View style={style.badges}>
				{data.crownAuthorityFlag === 1 && <Image source={crown} style={[style.badge, style.crown]} />}
				<Logo uri={data.appliIcon} style={[style.badge, style.logo]} />
			</View>
		</View>
	);
}

const style = StyleSheet.create({
	nav: {
		borderBottomWidth: 0
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
		paddingHorizontal: styles.toPercent(90),
		marginBottom: styles.transformSize(130)
	},
	author: {
		fontWeight: 'bold',
		fontSize: styles.transformSize(72),
		lineHeight: styles.transformSize(90),
		textAlign: 'center',
		marginBottom: styles.transformSize(24)
	},
	badges: {
		...styles.inlineWrap,
		...styles.centerWrap,
	},
	badge: {
		marginHorizontal: styles.transformSize(15)
	},
	crown: {
		width: styles.transformSize(90),
		height: styles.transformSize(70),
	},
	logo: {
		width: styles.transformSize(83),
		height: styles.transformSize(83),
		borderRadius: styles.transformSize(16)
	},
});

export {
	renderHead,
	renderCover,
};
export default {
	renderHead,
	renderCover,
};