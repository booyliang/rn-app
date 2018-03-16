

// import { createIconSet as expotCreateIconSet } from '@expo/vector-icons';
import glyphMap from '../js/assets/fonts/icons';
import { createIconSet } from 'react-native-vector-icons';
import {
    NativeModules
} from 'react-native';
let YIcon= createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');
let { YCommon } = NativeModules;


async function loadAssets() {
	if (!YCommon) { 
		await Expo.Font.loadAsync({
			'iconfont': require('../js/assets/fonts/iconfont.ttf'),
			// Roboto: require("native-base/Fonts/Roboto.ttf"),
			// Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
			
		});
	}
}

export { loadAssets, YIcon };