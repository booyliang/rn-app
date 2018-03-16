/**
 * author: AiQingmin
 */
import React, { Component } from 'react';
import { StyleSheet, YIcon, View } from '../base';
import styles from '../../styles';
export default class StarRating extends Component {
	static defaultProps = {
		maxStars: 5,
		rating: 0,
		disabled: false,
	};
	render() {
		let { maxStars, rating } = this.props;
		let stars = [];

		for (let i = 0; i < maxStars; i++) {
			let starEl = <YIcon name="start" key={i}
				style={[starStyle.starIcon, rating >= i + 1 && starStyle.active, this.props.style]}
				onPress={this.onStarPress(i)} />;
			stars.push(starEl);
		}
		return (
			<View style={starStyle.starsWrap}>
				{stars}
			</View>
		);
	}
	onStarPress = (i) => () => {
		if (this.props.disabled) {
			return false;
		}

		const newRating = i + 1;

		if (this.props.onStarChange) {
			this.props.onStarChange(newRating);
		}
	}
}
const starStyle = StyleSheet.create({
	starIcon: {
		fontSize: styles.transformSize(90),
		color: '#d7d7d7',
		paddingRight: styles.transformSize(30),
	},
	active: { color: '#ffcd06' },
	starsWrap: {
		flexDirection: 'row'
	}
});