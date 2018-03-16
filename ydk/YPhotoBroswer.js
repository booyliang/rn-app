import React, { Component, PropTypes } from 'react';
import { requireNativeComponent,Text } from 'react-native';


var Photo = requireNativeComponent('YPhotoBroswer', null);

export default class PhotoBroswer extends Component {
    render() {
        return global.Expo ? null : (
             <Photo style={this.props.style} picUrl={this.props.url} onTap={this.onTap}/>
        );
    }
    onTap= () => {
      this.props.onPress()
    }
}