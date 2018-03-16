import {
	Dimensions
} from 'react-native';

function transformSize(designSize) {
	const number = designSize / DESIGN_WIDTH * SCREEN_WIDTH;
	const remainder = number % 1;
	const int = number - remainder;
	return int + (0.25 <= remainder && remainder < 0.75 ? 0.5 : Math.round(remainder));
}

function toPercent(designSize, parentSize = DESIGN_WIDTH) {
	return `${designSize / parentSize * 100}%`;
}

const DESIGN_WIDTH = 1242;
const SCREEN_WIDTH = Dimensions.get('window').width;

export {
	transformSize,
	toPercent,
};

export default {
	transformSize,
	toPercent,
};