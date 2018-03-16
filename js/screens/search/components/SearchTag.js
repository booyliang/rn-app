import React, { Component } from 'react';
import { StyleSheet, View, Text, Touchable } from '@components';
import styles from '@styles';

export default class SearchTag extends Component {
	render() {
		let { label, index} = this.props;
		return (
			<View style={[style.wrap, this.props.style]}>
				<View style={style.indexWrap}><Text style={style.index}>{index}</Text></View>
				<Touchable onPress={this.props.onPress}><Text style={style.label} numberOfLines={1}>{label}</Text></Touchable>
			</View>
		);
	}
}
const style = StyleSheet.create({
	wrap: {
		...styles.inlineWrap,
		backgroundColor: '#fff',
		width: '50%',
		marginBottom: styles.transformSize(74),
	},
	indexWrap: {
		width: styles.transformSize(50),
		borderRadius: styles.transformSize(50),
		backgroundColor: styles.backgroundColor,
		alignItems: 'center',
		justifyContent: 'center',
	},
	index: {
		fontSize: styles.transformSize(30),
		color: '#999',
	},
	label: {
		fontSize: styles.transformSize(44),
		color: '#666',
		marginLeft: styles.transformSize(28),
		width: styles.transformSize(390),
	}
});