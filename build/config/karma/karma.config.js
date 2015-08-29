require('babel/register')({
	stage: 0,
	loose: ['all'],
	optional: ['runtime']
});
var path = require('path');
var rootDir = path.join('.', '..', '..', '..');
var webpackConfig = require('./../../../webpack.config');
module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'chai', 'chai-sinon'],
		files: [
			'./../../../node_modules/phantomjs-polyfill/bind-polyfill.js',
			path.join(rootDir, 'tests', 'specs', '**', '*.spec.js')
		],
		preprocessors: {
			'./../../../tests/specs/**/*.spec.js': ['webpack', 'sourcemap']
		},
		reporters: ['progress'],
		port: 9876,
		colors: true,
		autoWatch: false,
		singleRun: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		browsers: ['PhantomJS'],
		plugins: [
			'karma-phantomjs-launcher',
			'karma-chrome-launcher',
			'karma-webpack',
			'karma-sourcemap-loader',
			'karma-mocha',
			'karma-chai',
			'karma-chai-sinon'
		],
		webpack: webpackConfig,
		webpackMiddleware: {
			noInfo: true
		},
		client: {
			mocha: {
				grep: process.env.TEST_GREP || '',
				reporter: 'html',
				ui: 'bdd'
			}
		}
	});
};
