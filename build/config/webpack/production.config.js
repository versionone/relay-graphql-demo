import webpack from 'webpack';
import path from 'path';
import {WriteStatsPlugin} from './utils/plugins';
import {graphqlPath} from './../env.config';

export default {
	name: 'Production',
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			comments: false,
			compress: {
				warnings: false,
				screw_ie8: true
			}
		}),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify({
				BROWSER: true,
				NODE_ENV: 'production',
				GRAPHQL_PATH: graphqlPath

			})
		}),
		new WriteStatsPlugin({
			target: path.join(__dirname, '..', '..', '..', 'build', 'webpack-stats.json')
		})
	]
};
