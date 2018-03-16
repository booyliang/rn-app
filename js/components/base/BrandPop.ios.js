import React from 'react';
import {
	ImageBackground,
	StyleSheet
} from 'react-native';
import {
	Image,
	View,
	Text,
	Touchable,
	ActionSheet,
	Toast,
} from '@components';
import {
	YCommon
} from '@ydk';
import styles from '@styles';
import background from '@assets/images/brand-pop-background.png';
import slogan from '@assets/images/slogan.png';

const qrCodeUrl = 'https://cdn-mo.yryz.com/pic/yryz-new/yryzwxdyh.png';

class BrandPop extends React.Component {
	render() {
		return (
			<ImageBackground source={background} style={s.main}>
				<Touchable type="withoutFeedback" onLongPress={this.openMenu}>
					<Image source={{uri: qrCodeUrl}} style={s.qrCode} />
				</Touchable>
				<View style={s.textWrapper}>
					<Image source={slogan} style={s.slogan} />
				</View>
			</ImageBackground>
		);
	}

	openMenu = () => {
		ActionSheet.show({
			options: [
				'保存二维码',
				'取消'
			],
			cancelButtonIndex: 1
		}, async (index) => {
			if (index === 0) {
				await YCommon.saveImage({
					uri: qrCodeUrl
				});
				Toast.show('保存成功');
			}
		});
	};
}

const s = StyleSheet.create({
	main: {
		...styles.inlineWrap,
		alignSelf: 'center',
		width: styles.transformSize(1160),
		height: styles.transformSize(612),
		paddingTop: styles.transformSize(165),
		paddingHorizontal: styles.transformSize(59),
		marginTop: styles.transformSize(50)
	},
	qrCode: {
		width: styles.transformSize(359),
		height: styles.transformSize(359),
		marginRight: styles.transformSize(30)
	},
	slogan: {
		width: styles.transformSize(670),
		height: styles.transformSize(360),
		marginBottom: styles.transformSize(20)
	},
	textWrapper: {
		flex: 1
	},
	text: {
		lineHeight: styles.transformSize(68),
		fontSize: styles.transformSize(50),
	},
	bold: {
		fontWeight: 'bold',
		fontSize: styles.transformSize(50),
	}
});

export default BrandPop;