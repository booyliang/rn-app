/**
 *  Author: AiQingmin
 */
import React, { Component } from 'react';
import { Touchable, StyleSheet, View, Text, ScrollView } from '../../components';
import PropTypes from 'prop-types';
import styles from '../../styles';

export default class MorePanel extends Component {
	static propTypes = {
		title: PropTypes.string,
		hasMore: PropTypes.bool,
		getMore: PropTypes.func,
	}
	static defaultProps = {
		title: '请定义自己的title',
		moreLink: '查看更多',
		hasMore: true,
	}
	render() {
		let { title, children } = this.props;
		if (!children) {
			return null;
		}
		return (
			<ScrollView style={this.props.style}>
				<View style={style.retWrap}>
					<Text style={styles.helpText}>{title}</Text>
					{this.renderMore()}
				</View>
				{this.props.children}
			</ScrollView>

		);
	}
	renderMore = () => {
		let { moreLink } = this.props;
		if (!this.props.hasMore) {
			return null;
		}
		return (
			<Touchable onPress={this.props.getMore}>
				<Text style={style.moreWrap}>
					{moreLink}
				</Text>
			</Touchable>
		);
	}
}

const style = StyleSheet.create({
	retWrap: {
		backgroundColor: '#fff',
		paddingTop: styles.transformSize(62),
		...styles.padder,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	moreWrap: {
		color: styles.themeColor,
		fontSize: styles.transformSize(44),
	},
});