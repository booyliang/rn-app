import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet
} from 'react-native';
import {
	Video as ExpoVideo
} from '@ydk';
import {
	View,
	Image,
	Touchable,
	YIcon as Icon
} from '../';
import { onRouteChange, offRouteChange} from '../../services';
import styles from '../../styles';

class Video extends React.Component {
	state = {
		started: false,

	};

	static propTypes = {
		preview: PropTypes.bool,
		uri: PropTypes.string,
		poster: PropTypes.string,
	};

	static defaultProps = {
		preview: false
	};
	componentDidMount() {
		onRouteChange(this.onRouteChange);
	}
	componentWillUnmount() {
		offRouteChange(this.onRouteChange);
	}
	onRouteChange= async () => {
		let video = this.video;
		if (!video) {
			return;
		}
		let videoStatus = await video.getStatusAsync();
		videoStatus.isPlaying && video.pauseAsync();

	}

	start() {
		if (this.props.preview) {
			return;
		}
		this.setState({
			started: true
		});
		this.video.playAsync();
	}

	render() {
		return (
			<View style={[style.wrap, this.props.style]}>
				{!this.props.preview && this.renderVideo()}
				{this.renderCover()}
			</View>
		);
	}
	renderVideo() {
		return (
			<ExpoVideo
				source={{ uri: this.props.uri }}
				useNativeControls={this.state.started}
				resizeMode={ExpoVideo.RESIZE_MODE_CONTAIN}
				onPlaybackStatusUpdate={this.handlePlaybackStatusUpdate}
				ref={(video) => this.video = video}
				style={style.video} />
		);
	}
	renderCover() {
		let Wrapper = Touchable;
		let wrapperProps = {
			type: "withoutFeedback",
			onPress: this.start.bind(this)
		};

		if (this.props.preview) {
			Wrapper = View;
			wrapperProps = {};
		}

		return this.state.started ? null : (
			<Wrapper {...wrapperProps} style={style.coverWrap}>
				<View style={style.cover}>
					<Image source={{uri: this.props.poster}} placeholderDisabled style={style.poster} />
					<View style={style.control}><Icon name="media-start" style={style.controlIcon} /></View>
				</View>
			</Wrapper>
		);
	}

	handlePlaybackStatusUpdate = (status) => {
		if (status.didJustFinish) {
			this.video.stopAsync();
		}
	};
}

const style = StyleSheet.create({
	wrap: {
		paddingBottom: '45%',
		borderRadius: styles.transformSize(12),
		backgroundColor: 'black',
		overflow: 'hidden'
	},
	video: {
		...styles.full,
	},
	coverWrap: {
		...styles.full
	},
	cover: {
		...styles.full,
		...styles.centerWrap,
		backgroundColor: 'black'
	},
	poster: {
		...styles.full,
	},
	control: {
		...styles.round,
		...styles.maskBackground,
		...styles.centerWrap,
		width: styles.transformSize(146),
		height: styles.transformSize(146),
	},
	controlIcon: {
		fontSize: styles.transformSize(46),
		color: 'white',
		transform: [
			{
				translateX: styles.transformSize(8)
			}
		]
	},
});

export default Video;