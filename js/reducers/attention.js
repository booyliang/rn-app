import * as attentionList from '../actions/attention';

const LISTT_STATE = [];
const CLEAR_DATA = [];
export default function (state = LISTT_STATE, action = {}) {
	switch (action.type) {
		case attentionList.DELETE_ATTENTION: {
			const newState = [].concat(state);
			for (let i = 0; i < newState.length; i++) {
				let item = newState[i];
				if (action.payload.includes(item.id.toString())) {
					const delItem = newState.splice(i, 1);
					i--;
				}
			}
			// console.log('action.payload', action.payload);
			// console.log('state', newState);
			return newState;
		}

		case attentionList.CLEAR_ATTENTION: {
			state = [];
			return state;
		}

		case attentionList.LOAD_ATTENTION: {
			let newState = action.payload;
			return newState;
		}
		default: {
			return state;
		}
	}

}