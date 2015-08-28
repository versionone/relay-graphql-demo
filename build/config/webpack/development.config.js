import webpack from 'webpack';
import path from 'path';
import {WriteStatsPlugin} from './utils/plugins';
import {devPort} from './../env.config';

const publicPath = `http://localhost:${devPort}/`;
const rootDir = path.join(__dirname, '..', '..', '..');

export default {
	name: 'Development',
	devtool: '#eval-source-map',
	entry: {
		bundle: [
			`webpack-dev-server/client?${publicPath}`,
			'webpack/hot/only-dev-server',
			path.join(rootDir, 'app', 'client.js')
		]
	},
	output: {
		publicPath: publicPath
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'react-hot!babel'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
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
