// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import routes from './router'
import './css/global.css'
import http from './js/http'
import opusApi from './js/opus-api'
import viewport from './js/viewport'
import utils from './js/utils';
import env from './js/env';
import eventBus from './js/event-bus'
import filter from "./filters"
import toast from "./components/toast"
Vue.config.productionTip = false;

Vue.use(http);
Vue.use(opusApi);
Vue.use(utils);
Vue.use(env);
Vue.use(eventBus);
Vue.use(Router);
Vue.component(toast);
viewport()
let router = new Router(routes)
for (let name in filter) {
	Vue.filter(name, filter[name]);
}

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
