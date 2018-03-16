import React from 'react';
import {
	StyleSheet
} from 'react-native';
import {
	Touchable,
	Image,
} from '@components';
import styles from '@styles';

function renderFixedApp() {
	return (
		<Touchable type="highlight" onPress={this.toApp} style={style.fixedApp}>
			<Image source={{ uri: this.props.data.appInfo.appliIcon }} placeholder style={style.fixedAppLogo} />
		</Touchable>
	);
}

const fixedAppBorderRadius = styles.transformSize(34);
const style = StyleSheet.create({
	fixedApp: {
		position: 'absolute',
		right: styles.padding,
		bottom: styles.padding,
		borderRadius: fixedAppBorderRadius,
		elevation: 2
	},
	fixedAppLogo: {
		width: styles.transformSize(166),
		height: styles.transformSize(166),
		borderWidth: styles.transformSize(2),
		borderColor: '#bfbfbf',
		borderRadius: fixedAppBorderRadius,
		overlayColor: 'transparent'
	},
});

export {
	renderFixedApp
};
export default {
	renderFixedApp
};