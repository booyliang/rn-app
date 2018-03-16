import * as CityList from '../actions/city';

const LISTT_STATE = [];

export default function (state = LISTT_STATE, action = {}) {
	switch (action.type) {
	case CityList.LOAD_CITY: {
		let newState = action.payload;
		return newState;
	}
	default: {
		return state;
	}
	}

}