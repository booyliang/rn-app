import React, { Component } from 'react';
import { StyleSheet, View, Text, Touchable, YIcon, Keyboard } from '@components';
import { connect } from 'react-redux';
import styles from '@styles';

let mapStateToProps = (state) => {
	return {
		history: state.search.history,
	};
};
@connect(mapStateToProps)
export default class SearchHistory extends Component {

	render() {
		let { history } = this.props;
		if (!history) {
			return null;
		}
		return (
			<Touchable style={style.container} onPress={this.touchEmpty}>
				{history.slice(0, 5).map(this.renderItem)}
			</Touchable>
		);
	}
	renderItem = (item, index) => {
		return (
			<View style={style.itemWrap} key={index}>
				<Touchable style={style.touchWrap} onPress={this.handleHistoryPress(item)}>
					<YIcon name="clock-o" style={style.clock} />
					<Text style={style.textWrap}>{item}</Text>
				</Touchable>
				<Touchable type="withoutFeedback" onPress={this.deleteHistory(item)}>
					<YIcon name="close" style={style.iconWrap} />
				</Touchable>
			</View>
			
		);
	}
	touchEmpty = () => {
		Keyboard.dismiss();
	}
	deleteHistory = (item) => () => {
		this.props.dispatch({ type: 'DELETE_HISTORY', payload: { keyword: item}});
	}
	handleHistoryPress = (item) => () => {
		this.props.onHistoryPress && this.props.onHistoryPress(item);
		Keyboard.dismiss();
	}
}
const style = StyleSheet.create({
	container: {
		...styles.padder,
		backgroundColor: '#fff',
		flex: 1,
	},
	clock: {
		fontSize: styles.transformSize(46),
		color: '#bfbfbf',
		marginVertical: styles.transformSize(48),
	},
	itemWrap: {
		...styles.inlineWrap,
		height: styles.transformSize(140),
		...styles.borderBottom,
	},
	touchWrap: {
		flex: 1,
		...styles.inlineWrap,
		height: styles.transformSize(140),
		...styles.borderBottom,
	},
	textWrap: {
		flex: 1,
		marginLeft: styles.transformSize(20),
		// lineHeight: styles.transformSize(105),
		alignSelf: 'center',
	},
	iconWrap: {
		// flex: 0,
		width: styles.transformSize(70),
		// height: styles.transformSize(70),
		fontSize: styles.transformSize(46),
		marginVertical: styles.transformSize(48),
		color: '#bfbfbf',
	}
	
	
});