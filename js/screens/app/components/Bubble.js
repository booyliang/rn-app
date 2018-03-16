import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	ImageBackground,
	LayoutAnimation,
	Animated,
} from 'react-native';
import {
	Text
} from '@components';
import styles from '@styles';
import topBackground from '@assets/images/bubble-top.png';
import bottomBackground from '@assets/images/bubble-bottom.png';

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

class Bubble extends React.Component {
	render() {
		if (this.state.hidden) {
			return null;
		}

		const type = this.types[this.props.type];
		const style = [s.main].concat(type.style, this.props.style, {
			transform: [
				{
					translateY: this.state.offsetY
				}
			]
		});

		return (
			<AnimatedImageBackground source={type.background} style={style}>
				{this.renderText()}
			</AnimatedImageBackground>
		);
	}

	componentDidMount() {
		this.animateIn();
		setTimeout(() => {
			LayoutAnimation.easeInEaseOut();
			this.setState({
				hidden: true
			});
		}, 3000);
	}

	renderText = () => {
		const text = this.props.text;
		return Array.isArray(text)
			? text.map(this.renderTextLine)
			: this.renderTextLine(text);
	};

	renderTextLine = (text, index) => {
		return <Text key={index} style={s.text}>{text}</Text>;
	};

	animateIn = () => {
		LayoutAnimation.easeInEaseOut();
		Animated.timing(this.state.offsetY, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true
		}).start();
	};

	getInitialOffsetY = () => {
		return new Animated.Value(({
			'top': 10,
			'bottom': -10,
		})[this.props.type]);
	};

	types = {
		'top': {
			style: {
				width: styles.transformSize(481),
				height: styles.transformSize(279),
				paddingTop: styles.transformSize(28),
				paddingBottom: styles.transformSize(90)
			},
			background: topBackground
		},
		'bottom': {
			style: {
				width: styles.transformSize(372),
				height: styles.transformSize(227),
				paddingTop: styles.transformSize(46),
				paddingBottom: styles.transformSize(20)
			},
			background: bottomBackground
		},
	};

	state = {
		hidden: false,
		offsetY: this.getInitialOffsetY()
	};

	static propTypes = {
		type: PropTypes.string,
		text: PropTypes.node
	};

	static defaultProps = {
		type: 'top'
	};
}

const s = StyleSheet.create({
	main: {
		position: 'absolute',
		justifyContent: 'center',
	},
	text: {
		fontSize: styles.transformSize(52),
		lineHeight: styles.transformSize(66),
		textAlign: 'center',
		color: styles.themeColor,
		backgroundColor: 'transparent'
	}
});

export default Bubble;