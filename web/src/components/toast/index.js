import ToastVue from './toast';
import Vue from 'vue';

let ToastComponent = Vue.extend(ToastVue);
let toastInstance, timer = null;
function toast(message, opts = {}) {
	if (!toastInstance) {
		toastInstance = new ToastComponent({
			el: document.createElement('div')
		});
	}
	if (toastInstance.showToast) return;

	document.body.appendChild(toastInstance.$el);
	if (typeof message === 'string') {
		toastInstance.text = message;
	}
	toastInstance.showToast = true;
	if (opts.autoClosed) return;
	clearTimeout(timer);
	timer = setTimeout(function () {
		toastInstance.showToast = false;
	}, 2000);
}
Vue.toast = Vue.prototype.$toast = toast;
export default toast;