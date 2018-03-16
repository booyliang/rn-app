import React from 'react';
import {
	StyleSheet
} from 'react-native';
import {
	YIcon as Icon
} from '../../assets';
class YIcon extends React.Component {
	render() {
		const styleObject = StyleSheet.flatten(this.props.style) || {};
		const height = Math.ceil(styleObject.height || this.props.size || styleObject.fontSize);
		return <Icon {...this.props} style={[s.main, this.props.style, {height}]} />;
	}

	static propTypes = Icon.propTypes;
}

const s = StyleSheet.create({
	main: {
		backgroundColor: 'transparent'
	}
});

export default YIcon;