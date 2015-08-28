import {env} from './../../env.config';
import baseConfig from './../default.config';

const envConfig = require(`./../${env}.config`);

const findValue = (parts, config) => parts.reduce((memo, part) => {
	if (memo && memo[part]) {
		return memo[part];
	}
	return false;
}, config);

export function getValue(path) {
	const parts = path.split('.');
	let value = findValue(parts, envConfig);
	if (!value) {
		value = findValue(parts, baseConfig);
	}
	return value;
}
