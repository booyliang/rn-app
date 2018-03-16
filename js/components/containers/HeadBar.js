import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { transformSize } from "@styles";
import PropTypes from 'prop-types';
export default class HeadBar extends Component {
	constructor(props) {
		super(props),
		this.state = {};
	}

	componentDidMount() {

	}

	render() {
		const { color, height } = this.props;
		return (
			<View style={[styles.bar, { backgroundColor: color, height: transformSize(height) }]}></View>
		);
	}

	static PropTypes = {
		color: PropTypes.string,
		height: PropTypes.number
	}

	static defaultProps = {
		color: "#ff6f6b",
		height: 52,
	}
}

const styles = StyleSheet.create({
	bar: {
		width: transformSize(6), 
		backgroundColor: "#ff6f6b",
		borderRadius: transformSize(0)
	}
});