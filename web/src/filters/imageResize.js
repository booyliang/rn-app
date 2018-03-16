
/**  图片缩放
 * @export
 * @param {String} img_url 图片url
 * @param {String} type 样式类型
	** 1   瀑布流列表 左图右文样式     200*180px
	** 2 瀑布流列表 上下排版 多图样式    222*222px
	** 3 瀑布流列表 上下排版 单图样式    690*388px
	** 4 两列 列表页（例：旅游天地圈-攻略 页面）    335*255px
	** 5 详情页 封面图尺寸    750*422px     以上几种尺寸 都为固定尺寸，各种屏幕需要等比例缩放适配
	** 6 详情页 图片尺寸    宽为：690px，高度等比例缩放  宽度固定，高度等比例缩放
	** 7 图标(首页广告) 图标尺寸    宽为：70px，高度等比例缩放  宽度固定，高度等比例缩放
	** 9 图书推荐(左图右文样式)  80*115
	** 10 瀑布流列表 上下排版 双图样式    339*339px

 * @returns 
 */

let ratio = window.screen.width * window.devicePixelRatio / 375;
if (ratio < 1) ratio = 1;

const typeOptions = {
	'1': {
		m: 'fill',
		w: 200,
		h: 180,
		limit: 0,
	},
	'2': {
		m: 'fill',
		w: 100,
		h: 100,
		limit: 0,
	},
	'3': {
		m: 'fill',
		w: 345,
		h: 194,
		limit: 0,
	},
	'4': {
		w: 335,
		h: 255,
	},
	'5': {
		m: 'fill',
		w: 750,
		h: 422,
		limit: 0,
	},
	'6': {
		w: 690,
	},
	'7': {
		w: 70,
	},
	'8': {
		m: 'fill',
		w: 750,
		h: 202,
		limit: 0,
	},
	'9': { // 图书列表
		m: 'fill',
		w: 80,
		h: 115,
		limit: 0,
	},
	'10': {
		m: 'fill',
		w: 339,
		h: 339,
		limit: 0,
	},
	'11': {
		m: 'fill',
		w: 375,
		h: 375,
		limit: 0,
	},
	'12': {
		m: 'fill',
		w: 2560,
		quality: false,
		ratio: false
	}
}

export default function (_url, type) {
	if (!_url || typeof _url !== 'string') {
		console.error('图片url不正确');
		return _url;
	}
	if (!type || typeof type !== 'number') {
		console.error('请传入正确的type值');
		return _url;
	}
	let options = typeOptions[type];
	if (!options) {
		console.error(`imageResize --> type值范围为1-${Object.keys(typeOptions).length}`);
		return _url;
	}
	let { m = 'lfit', w, h, limit = 1 } = {};
	m = options.m || m;
	w = options.w;
	h = options.h || 0;
	if (options.limit !== undefined) limit = options.limit;

	if (options.ratio !== false) {
		w = parseInt(w * ratio), h = parseInt(h * ratio);
	}

	let param = options.h
		? { m, w, h, limit }
		: { m, w, limit };

	_url += '?x-oss-process=image/resize';

	for (let key in param)
		_url += `,${key}_${param[key]}`;

	if (type !== 5 && type !== 6 && _url.indexOf('.gif') > -1)
		_url += '/format,png'
	if (options.quality !== false) 
		_url = `${_url}/quality,Q_80`
	return _url;
}