import React from 'react';
import {
	Toast as NativeBaseToast
} from 'native-base';

class Toast extends React.Component {
	render() {
		return null;
	}

	static show(message) {
		if (typeof message === 'object') {
			console.warn('Object-type argument of `Toast.show` is deprecated, use a string instead.');
		} else {
			message = {
				text: message
			};
		}

		return NativeBaseToast.show(Object.assign({
			duration: 3500
		}, message));
	}
}

export default Toast;