import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet
} from 'react-native';
import {
	View,
	Text,
	Image,
	Button,
} from '../';
import styles from '@styles';
import noDataIcon from '@assets/images/no-data.png';

class Message extends React.Component {
	render() {
		const config = this.getConfig();
		const actionTrigger = config.action
			? <Button block onPress={config.action.handler} style={s.actionTrigger}><Text>{config.action.text}</Text></Button>
			: null;

		return (
			<View style={s.main}>
				<Image source={config.icon} style={s.icon} />
				<Text style={s.text}>{config.text}</Text>
				{actionTrigger}
			</View>
		);
	}

	getConfig = () => {
		const type = this.props.type;

		if (type) {
			return this.builtInTypes[type];
		}

		const {
			icon,
			text,
			action
		} = this.props;
		return {
			icon,
			text,
			action
		};
	};

	builtInTypes = {
		'no-data': {
			icon: noDataIcon,
			text: '内容还在筹备中！'
		},
	};

	static propTypes = {
		type: PropTypes.string,
		icon: PropTypes.number,
		text: PropTypes.string,
		action: PropTypes.object
	};
}

const s = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: styles.padding,
		backgroundColor: 'white'
	},
	icon: {
		marginBottom: styles.transformSize(34)
	},
	text: {
		textAlign: 'center',
		color: styles.textSecondaryColor
	},
	actionTrigger: {
		alignSelf: 'center',
		maxWidth: styles.transformSize(862),
		width: '100%',
		marginTop: styles.transformSize(166)
	}
});

export default Message;