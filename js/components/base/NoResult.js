import React from 'react';
import { Text, StyleSheet, View } from './';
import { transformSize, textSecondaryColor } from '../../styles';
export default NoResult = (props) => {
	return (
		<View style={styles.noRetWrap}>
			<Text style={styles.commentsWrap}>{props.comments}</Text>
			<View style={styles.bottom}></View>
		</View>
	);
};
const styles = StyleSheet.create({
	noRetWrap: {
		backgroundColor: '#fff',
		paddingTop: transformSize(50), 
	},
	imgWrap: {
		alignSelf: 'center',
	},
	commentsWrap: {
		textAlign: 'center',
		color: textSecondaryColor,
		marginBottom: transformSize(50),
	},
	bottom: {
		height: transformSize(30),
		backgroundColor: '#f8f8f8',
	}
});