const baseConfig = require('./app.base.json');
let  _ = require('lodash')
console.log('build configuration loaded from build/app.base.json');
const fs = require('fs');
const path = require('path');
let config = Object.assign({}, baseConfig);
let env = process.argv[2] || 'dev'

if (env) {
	console.log(`merge configuration file from build/app.${env}.json`);
	let envConfig = require(`./app.${env}.json`);
	config = _.merge(config,envConfig)
}
// console.log(JSON.stringify(config, null, 2))
let appConfig = JSON.stringify(config, null, 2);
appConfig.env = env
let contents = ['// 自动生成的文件，不要编辑本文件代码！\n'
	, `const Constants=${appConfig};`,
	'export default Object.freeze(Constants);'];
fs.writeFileSync(path.join(__dirname,'..','app.json'), appConfig, 'utf8');

fs.writeFileSync(path.join(__dirname,'..','ydk','Constants.js'),contents.join('\n'), 'utf8');