import { NativeModules } from 'react-native';

const defaultCommon = {
	track: function () {
		console.log('zhugeio成功')
	}
}

let { YZhugeIo = defaultCommon } = NativeModules;
export default YZhugeIo;
