/**
 * Author: AiQingmin
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from '../../styles';
export default class Panel extends Component {
	static propTypes = {
		title: PropTypes.string,
	}
	static defaultProps = {
		title: '猜你喜欢'
	}
	render() {
		let { title} = this.props;
		return (
			<View style={[style.title, this.props.style]}>
				<View style={style.icon}></View>
				<Text style={style.textWrap}> {title}</Text>
			</View>
		);
	}
}
const style = StyleSheet.create({
	title: {
		...styles.inlineWrap,
		paddingVertical: styles.transformSize(44),
		paddingLeft: styles.padding,
		borderBottomColor: styles.borderColor,
		borderBottomWidth: 1,
		// marginTop: styles.transformSize(30),
		backgroundColor: '#fff',
	},
	icon: {
		width: styles.transformSize(6),
		height: styles.transformSize(48),
		backgroundColor: styles.themeColor,
		borderRadius: styles.transformSize(3),
		alignSelf: 'center',
	},
	textWrap: {
		fontSize: styles.transformSize(54),
		color: '#000',
	}
});