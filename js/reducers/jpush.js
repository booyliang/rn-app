import * as pushAction from '../actions/jpush';
// import Lodash from 'lodash';

const DEFAULT_STATE = {
	pushInfoList: [],
	pushAnnouncementInfo: {
		title: '暂无公告',
		content: '',
		hasRead: true,
	},
	pushCount: 0,
	pushAnnCount: 0,
};
function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			let newState = handlers[action.type](state, action);
			let pushInfoList = newState.hasOwnProperty('pushInfoList') ? newState.pushInfoList : state.pushInfoList;
			let pushAnnCount = newState.hasOwnProperty('pushAnnCount') ? newState.pushAnnCount : state.pushAnnCount;
			let pushCount = processPushCount(pushInfoList, pushAnnCount);
			return { ...state, ...newState, pushCount };
		} else {
			return state;
		}
	};
}


function addPushAnn(state, action) {
	let { pushAnnCount } = state;
	let pushAnnouncementInfo = action.payload;
	pushAnnouncementInfo.time = getTimestamp();
	pushAnnouncementInfo.hasRead = false;
	pushAnnCount++;
	return { pushAnnCount, pushAnnouncementInfo };
}

function changePushAnnRead(state, action) {
	let { pushAnnouncementInfo } = state;
	pushAnnCount = 0;
	pushAnnouncementInfo.hasRead = true;
	return { pushAnnouncementInfo, pushAnnCount };
}

function addPushInfo(state, action) {
	let pushInfo = action.payload;
	let { pushInfoList } = state;
	pushInfo.time = getTimestamp();
	pushInfo.hasRead = false;
	pushInfoList = pushInfoList.filter((item) => {
		return item.messageId != pushInfo.messageId;
	});
	pushInfoList.unshift(pushInfo);
	return { pushInfoList };
}

function changePushInfo(state, action) {
	let pushInfo = action.payload;
	let { pushInfoList } = state;
	for (let item of pushInfoList) {
		if (item.messageId === pushInfo.messageId)
			item.hasRead = true;
	}
	return { pushInfoList };
}

function deleteSinglePushInfo(state, action) {
	action.payload = [action.payload];
	return deleteListPushInfo(state, action);
}

function deleteListPushInfo(state, action) {
	let { pushInfoList } = state;
	let removeList = action.payload;
	let removeMessageIdList = removeList.map(item => item.messageId);
	pushInfoList = pushInfoList.filter((item) => !removeMessageIdList.includes(item.messageId));
	return { pushInfoList };
}

function deleteAllPushInfo(state, action) {
	return DEFAULT_STATE;
}


let processPushCount = (list, initCount = 0) => {
	return list.reduce((total, item) => { if (!item.hasRead) total++; return total; }, initCount);
};

let getTimestamp = () => {
	let myAnnDate = new Date();
	return myAnnDate.getTime();
};
let reducer = createReducer(DEFAULT_STATE, {
	[pushAction.ADD_PUSH_ANNOUNCEMENT_INFO]: addPushAnn,
	[pushAction.CHANGE_PUSH_ANNOUNCEMENT_READ]: changePushAnnRead,
	[pushAction.ADD_PUSH_INFO]: addPushInfo,
	[pushAction.CHANGE_PUSH_INFO]: changePushInfo,
	[pushAction.DELETE_SINGLE_PUSH_INFO]: deleteSinglePushInfo,
	[pushAction.DELETE_LIST_PUSH_INFO]: deleteListPushInfo,
	[pushAction.DELETE_ALL_PUSH_INFO]: deleteAllPushInfo,

});
export default reducer;