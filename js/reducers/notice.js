import * as noticeActions from '../actions/notice';

const INTRO_STATE = [];
const DEl_NOTICE = [];

export default function (state = INTRO_STATE, action = {}) {
	switch (action.type) {
	case noticeActions.LOAD_NOTICE: {
		let newState = action.payload;

		newState.forEach((item) => {
			state.forEach((element) => {
				if (element.id == item.id && !element.checkBOx) {
					item.checkBOx = false;
				}
			});
		});

		return [...newState];
	}

	case noticeActions.DELETE_NOTICE: {
		let oldState = action.payload;
		DEl_NOTICE = [...oldState];
		return [...oldState];
	}

	default: {
		return state;
	}
	}
}