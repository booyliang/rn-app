
import Constants from './Constants';

export { loadAssets, YIcon } from './Assets';
import YScaleImage from './YScaleImage';
import * as ImagePicker from './ImagePicker'
import YZhugeIo from "./YZhugeIo"
import YdkComponent from './YdkComponent'
import YLoadingView from "./YLoadingView"
import YPhotoBroswer from "./YPhotoBroswer"
export { ImagePicker ,YdkComponent}
import YCommon from './YCommon';
export { YCommon }
let Video = null;
if (global.Expo && Expo.Video) {
	Video = Expo.Video
} else {
	Video = require('./Video').default;
}
console.log('Constants', Constants)
export { Video, YZhugeIo, Constants, YScaleImage }

import YShareSDK from './YShareSDK';
export {
	YShareSDK,YLoadingView,YPhotoBroswer
};
