import * as homeActions from '../actions/home';
// TBD load local images
const DEFAULT_STATE = {
	adList: [{ id: 1, adPicture: require('@assets/images/local_ad1.png') },
		{ id: 2, adPicture: require('@assets/images/default.png') },
		{ id: 3, adPicture: require('@assets/images/the-last-of-us.jpg') }],
	subjectList: [],
	hotWords: '',
};
export default function (state = DEFAULT_STATE, action = {}) {
	switch (action.type) {
	case homeActions.LOAD_ADS: {
		// action.payload ={asList:[ad,ad]}
		return { ...state, ...action.payload };
	}
	case homeActions.DELETE_ADS: {
		return Object.assign({}, state, { adList: DEFAULT_STATE.adList });
	}
	case homeActions.LOAD_SUBJECT: {
		return { ...state, ...action.payload };
	}
	case homeActions.LOAD_HOTWORDS: {
		return { ...state, ...action.payload };
	}
	default:
		return state;

	}
}