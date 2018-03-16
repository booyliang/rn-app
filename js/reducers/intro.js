import * as introconent from '../actions/intro';
const INTRO_STATE = [];

export default function (state = INTRO_STATE, action = {}) {
	console.log(action.type);
	switch (action.type) {
	case introconent.LOAD_INTRO: {
		let newState = action.payload;
		return newState;
	}
	default: {
		return state;

	}
	}
}