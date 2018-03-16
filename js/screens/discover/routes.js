
import WitkeyDetail from './WitkeyDetail';
import SubjectHome from './SubjectHome';
import WitkeyHome from "./WitkeyHome";
import Subject from './Subject';
import Witkey from './Witkey';

const DiscoverRoute = {
	WitkeyDetail: {
		screen: WitkeyDetail,
		path: 'witkeyDetail/:id'
	},
	SubjectHome: {
		screen: SubjectHome
	},
	WitkeyHome: {
		screen: WitkeyHome
	},
	Subject: {
		screen: Subject
	},
	Witkey: {
		screen: Witkey
	}
};
export default DiscoverRoute;