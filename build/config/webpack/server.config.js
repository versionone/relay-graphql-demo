import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

const rootDir = path.join(__dirname, '..', '..', '..');

export default {
	name: 'Server',
	target: 'node',
	externals: fs.readdirSync(path.join(rootDir, 'node_modules'))
		.reduce((memo, dir) => {
			if (['.bin'].indexOf(dir) === -1) {
				memo[dir] = dir;
			}
			return memo;
		}, {}),
	entry: {
		bundle: path.join(rootDir, 'app', 'routes.js')
	},
	output: {
		path: path.join(rootDir, 'build'),
		publicPath: undefined,
		filename: 'routes-compiled.js',
		libraryTarget: 'commonjs2'
	},
	module: {
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
				BROWSER: false,
				NODE_ENV: process.env.NODE_ENV || 'development'
			})
		})
	]
};
