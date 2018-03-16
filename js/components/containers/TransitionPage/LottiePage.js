import React from 'react';
import Animation from 'lottie-react-native';
import { YCommon } from '@ydk';
import { View, Platform, InteractionManager } from 'react-native';

// require('./animation.json')
export default class LottiePage extends React.Component {
	componentDidMount() {
		YCommon.closeLoadingPage();
	}
	play() {
		InteractionManager.runAfterInteractions(() => {
			this.animation.play();
		});

	}
	render() {
		let imageAssetsFolder = Platform.OS === 'android' ? 'images/' : undefined;

		return (
			<View style={this.props.style}>
				<Animation
					ref={animation => { this.animation = animation; }}
					imageAssetsFolder={imageAssetsFolder}
					{...this.props}
				/>
			</View>
		);
	}
}