import webpack from 'webpack';
import path from 'path';
import {WriteStatsPlugin} from './utils/plugins';
import {devPort} from './../env.config';

const publicPath = `http://localhost:${devPort}/`;
const rootDir = path.join(__dirname, '..', '..', '..');

export default {
	name: 'Test',
	devtool: '#inline-source-map',
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify({
				BROWSER: true,
				NODE_ENV: 'development'
			})
		}),
		new WriteStatsPlugin({
			target: path.join(rootDir, 'build', 'webpack-stats.json')
		})
	]
};
