/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules,
    Dimensions,
    Modal
} from 'react-native';

import {Image} from 'react-native'


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

/**广告页倒计时部分**/
const {
    width,
    height
} = Dimensions.get('window');
let time = 2;




export default class App extends Component {
    componentWillMount() {
     
    }

    handlePress = async() => {
        let image = await ImagePicker.launchImageLibraryAsync();
        alert(JSON.stringify(image))

    }
    
    
   
    handleRequestClose() {
    }


    render() {
        return (
            <View style={styles.container}>
                 
                   
                    <Image source={require('./js/assets/images/logo.png')}/>
                    <Text style={styles.welcome}>
                        Welcome to YRYZ app!!!
                    </Text>
                    <Text style={styles.instructions}>
                        To get started, edit App.js
                    </Text>
                    <Text style={styles.instructions}>
                        {instructions}
                    </Text>
                    {/* {<ShareSdk />} */}
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width,
        height,
        position: 'absolute'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
// export default Main;
