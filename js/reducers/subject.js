import * as todoAction from '../actions/subject';

const defaultState = [];

export default function (state = defaultState, action = {}) {
	if (action.type == todoAction.SET_SUBJECT) {
		return [...action.payload];
	} 
	return defaultState;
}