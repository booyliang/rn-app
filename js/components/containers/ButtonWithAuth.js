import React from 'react';
import {
	Button
} from '@components';
import {
	sign
} from '@services';

class ButtonWithAuth extends React.Component {
	render() {
		return <Button {...this.props} onPress={this.handlePress} />;
	}

	handlePress = async () => {
		if (!sign.isIn()) {
			await sign.in();
		}

		this.props.onPress();
	};

	static propTypes = Button.propTypes;
}

export default ButtonWithAuth;