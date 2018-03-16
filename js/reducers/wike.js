import * as wikeList from '../actions/wike';

const LISTT_STATE = [];
const DEl_WIK = [];
// const CLEAR_DATA = [];
export default function (state = LISTT_STATE, action = {}) {
	switch (action.type) {
		case wikeList.DELETE_WIKE: {
			const newState = [].concat(state);
			DEl_WIK = [...state];
			for (let i = 0; i < newState.length; i++) {
				let item = newState[i];
				if (action.payload.includes(item.id.toString())) {
					const delItem = newState.splice(i, 1);
					i--;
				}
			}
			return newState;
		}

		case wikeList.FAVORATE_WIKE: {
			return DEl_WIK;
		}

		case wikeList.LOAD_WIKE: {
			let newState = action.payload;
			return newState;
		}
		case wikeList.CLEAR_WIKE: {
			state = [];
			return state;
		}

		default: {
			return state;

		}
	}

}