import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet
} from 'react-native';
import {
	Image,
} from '@components';
import styles from '@styles';

class Logo extends React.Component {
	render() {
		return <Image source={{uri: this.props.uri}} style={[style.main, this.props.style]} />;
	}

	static propTypes = {
		uri: PropTypes.string
	};
}

const style = StyleSheet.create({
	main: {
		...styles.border,
		width: styles.transformSize(250),
		height: styles.transformSize(250),
		borderRadius: styles.transformSize(48),
	}
});

export default Logo;