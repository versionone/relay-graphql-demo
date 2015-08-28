import webpack from 'webpack';
import path from 'path';
import {WriteStatsPlugin} from './utils/plugins';
import {env} from './../env.config';

const rootDir = path.join(__dirname, '..', '..', '..');

export default {
	name: 'Webpack',
	devtool: undefined,
	target: 'web',
	externals: undefined,
	entry: {
		bundle: path.join(rootDir, 'app', 'client.js')
	},
	output: {
		path: path.join(rootDir, 'public', 'build'),
		publicPath: '/build/',
		filename: '[hash].js',
		chunkFilename: '[chunkhash].js',
		libraryTarget: 'var'
	},
	module: {
		resolve: ['', '.js', '.json'],
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			}
		]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify({
				BROWSER: true,
				NODE_ENV: env
			})
		}),
		new WriteStatsPlugin({
			target: path.join(rootDir, 'build', 'webpack-stats.json')
		})
	],
	babel: {
		stage: 0,
		loose: ['all'],
		optional: ['runtime'],
		plugins: [
			path.join(__dirname, 'utils', 'babelRelayTransformer.js')
		]
	},
	url: undefined,
	file: undefined
};