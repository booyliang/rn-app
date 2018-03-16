import React from 'react';
import {
	ToastAndroid
} from 'react-native';

class Toast extends React.Component {
	render() {
		return null;
	}

	static show(message) {
		if (typeof message === 'object') {
			console.warn('Object-type argument of `Toast.show` is deprecated, use a string instead.');
			message = message.text;
		}

		return ToastAndroid.show(message, ToastAndroid.LONG);
	}
}

export default Toast;