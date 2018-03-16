import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet
} from 'react-native';
import {
	View
} from './';
import styles from '@styles';

class Responsive extends React.Component {
	render() {
		const styleObject = StyleSheet.flatten(this.props.style) || {};
		const wrapperStyle = this.getWrapperStyle(styleObject);
		const newStyle = this.getNewStyle(styleObject);

		const Component = this.props.component;

		return (
			<View style={[wrapperStyle, this.props.style]}>
				<Component {...this.props} style={newStyle} />
			</View>
		);
	}

	getWrapperStyle(stylePropObject) {
		const wrapperWidth = stylePropObject.width;
		return {
			width: wrapperWidth,
			paddingBottom: `${parseFloat(wrapperWidth || '100%') * this.props.ratio}%`
		};
	}

	getNewStyle(styleObject) {
		const newStyleObject = Object.assign({}, styleObject);
		[
			'width',
			'margin',
			'marginVertical',
			'marginHorizontal',
			'marginLeft',
			'marginRight',
			'marginTop',
			'marginBottom',
		].forEach((prop) => {
			delete newStyleObject[prop];
		});

		return [
			style.main,
			newStyleObject
		];
	}

	static propTypes = {
		component: PropTypes.func.isRequired,
		ratio: PropTypes.number.isRequired
	};
}

const style = StyleSheet.create({
	main: {
		...styles.full
	}
});

export default Responsive;