import React from 'react';
import {
	StyleSheet,
} from 'react-native';
import {
	Text,
} from 'native-base';

import styles from '../../styles';

class Tag extends React.Component {
	render() {
		return (
			<Text {...this.props} style={[style.tag].concat(this.props.style)}></Text>
		);
	}
}

const style = StyleSheet.create({
	tag: {
		fontSize: styles.transformSize(40),
		color: 'white',
		paddingVertical: styles.transformSize(3),
		paddingHorizontal: styles.transformSize(14),
		backgroundColor: styles.assistColor,
		borderRadius: styles.transformSize(6),
		overflow: 'hidden'
	}
});

export default Tag;