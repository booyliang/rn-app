import pathToRegexp from 'path-to-regexp';
import qs from 'qs';
import axios from 'axios';
import {
	Toast
} from '@components';
import httpFactory from './http';

function init() {
	const http = httpFactory();
	Toast.show({text: 'There is some problems with mock service, please run `yarn start` instead. ☹️'});
	return http;

	http.interceptors.request.use(async (req) => {
		const apiUrl = (await toMockUrl(req.url)) || req.url;
		Object.assign(req, {
			url: apiUrl
		});
		return req;
	}, () => {

	});

	return http;
}

async function toMockUrl(url) {
	if (!apis) {
		await getApis();
	}

	return getMatchedApi(url);
}

async function getApis() {
	await signIn();
	const projectIds = await getProjectIds();
	const reses = await Promise.all(projectIds.map((projectId) => axios({
		url: `http://rap.yryz.com/mock/getWhiteList.do?projectId=${projectId}`
	})));
	projectIds.forEach((projectId, index) => {
		apis = apis || {};
		apis[projectId] = reses[index].data;
	});
}

async function signIn() {
	await axios({
		method: 'POST',
		url: 'http://rap.yryz.com/account/doLogin.do',
		data: qs.stringify({
			account: 'wangboning',
			password: '123456'
		})
	});
}

async function getProjectIds() {
	return (await axios({
		url: 'http://rap.yryz.com/org/group/all.do?productlineId=6'
	})).data.groups[0].projects.map((project) => project.id);
}

function getMatchedApi(url) {
	for (let projectId in apis) {
		const projectApis = apis[projectId];
		const matchedApi = projectApis.find((api) => isMatched(url, api));

		if (matchedApi) {
			return `http://rap.yryz.com/mockjsdata/${projectId}${matchedApi}`;
		}
	}

	Toast.show({text: `Cannot find an API that matches "${url}" in RAP.\n\nURL: ${JSON.stringify(url)}`});
}

function isMatched(url, api) {
	const regExp = pathToRegexp(formatParams(api));
	return regExp.test(url);
}

function formatParams(api) {
	return api.replace(/\{(\w+)\}/g, ':$1');
}

let apis = null;

export default init;