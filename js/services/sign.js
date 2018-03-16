import store from '../store';
import {
	signOut
} from '@actions/user';
import { YZhugeIo } from '@ydk';
let instance = null;
const sign = {
	init(element) {
		instance = element;
	},

	open() {
		instance.setState({
			opened: true
		});
		// 诸葛埋点
		YZhugeIo.track('登录弹出', {});
	},

	close() {
		return instance.close();
	},

	in() {
		return this.start(undefined, 'in');
	},

	out() {
		store.dispatch(signOut());
	},

	up() {
		return this.start(undefined, 'up');
	},

	updatePassword() {
		return this.start('PasswordUpdating');
	},

	start(view = 'Initial', branch) {
		return new Promise((resolve, reject) => {
			instance.resolve = resolve;
			instance.reject = reject;
			instance.setState({
				view,
				branch
			});
			this.open();
		});
	},

	isIn() {
		return store.getState().user.isSignIn;
	}
};

export default sign;