import React from 'react';
import Animation from 'lottie-react-native';
import { YCommon, YdkComponent } from '../ydk';
import { View} from 'react-native'
export default class BasicExample extends React.Component {
  componentDidMount() {
	  this.animation.play();
	  YCommon.closeLoadingPage();
  }

  render() {
	  return (
		  <View style={{flex:1}}>
      <Animation
        ref={animation => { this.animation = animation; }}
        style={{
          width: '100%',
          height: '100%',
        }}
        source={require('./animation.json')}
			  />
			  </View>
    );
  }
}