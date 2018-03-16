import React, { Component, PropTypes } from 'react';
import { requireNativeComponent,Text } from 'react-native';


var Loading = requireNativeComponent('YLoadingView', null);

export default class YLoadingView extends Component {
    render() {
        return global.Expo ? null : (
             <Loading style={this.props.style}/>
        );
    }
}