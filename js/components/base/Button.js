import React from 'react';
import {
	StyleSheet
} from 'react-native';
import {
	Button as NaviveBaseButton
} from 'native-base';
import {
	View
} from '../';
import styles from '../../styles';

class Button extends React.Component {
	render() {
		const hasMask = !this.props.transparent;

		return (
			<NaviveBaseButton
				{...this.props}
				activeOpacity={hasMask ? 1 : undefined}
				onPressIn={this.handlePressIn.bind(this)}
				onPressOut={this.handlePressOut.bind(this)}
				style={[style.main].concat(this.props.style)}
			>
				{hasMask && this.renderMask()}
				{this.props.children}
			</NaviveBaseButton>
		);
	}

	renderMask() {
		const maskStyle = [
			style.mask,
			{
				opacity: this.state.pressing ? 0.1 : 0
			}
		];

		return <View style={maskStyle} />;
	}

	handlePressIn() {
		this.setState({
			pressing: true
		});
	}

	handlePressOut() {
		this.setState({
			pressing: false
		});
	}

	state = {
		pressing: false
	};

	static propTypes = NaviveBaseButton.propTypes;
};

const style = StyleSheet.create({
	main: {
		overflow: 'hidden'
	},
	mask: {
		...styles.full,
		backgroundColor: 'black'
	}
});

export default Button;