import getBabelRelayPlugin from 'babel-relay-plugin';

let data;
try {
	data = require('./../../../schema.json').data;
} catch (ex) {
	data = {};
}

export default getBabelRelayPlugin(data);
