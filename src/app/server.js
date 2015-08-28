import koa from 'koa';
import mount from 'koa-mount';
import statics from 'koa-static';
import compress from 'koa-compress';
import bodyparser from 'koa-bodyparser';
import proxy from 'koa-proxy';
import graphqlHTTP from 'koa-graphql';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {green, red} from 'colors';
import Html from './components/Html';
import {isProduction, port, graphqlPath, graphqlPort, devPort} from './../build/config/env.config';
//import Router from 'react-router';
//import Location from 'react-router/lib/Location';
//import Application from './components/containers/Application';

const app = koa();
const graphQLServer = koa();

let schema = null;
try {
	schema = require('./../data/schema');
} catch (ex) {
	console.error(red('ERROR: Cannot find schema.json.'));
}
if (schema !== null) {
	graphQLServer.use(graphqlHTTP({
		schema: schema,
		pretty: true
	}));

	graphQLServer.listen(graphqlPort, () => {
		console.log(green(`GraphQL Server running at http://localhost:${graphqlPort}`));
	});

	app.use(mount(graphqlPath, proxy({
		host: `http://localhost:${graphqlPort}`
	})));
}

if (!isProduction) {
	app.use(mount('/build', proxy({
		host: `http://localhost:${devPort}`
	})));
}

app.use(compress());
app.use(bodyparser());
app.use(statics(path.join(__dirname, './../public')));

app.use(function* render() {
	let stats;
	try {
		stats = require('./../build/webpack-stats.json');
	} catch (ex) {
		stats = {};
		console.error(red('Cannot find webpack-stats.json'));
	}

	//let markup = '';
	//try {
	//	const routerProps = yield new Promise((resolve, reject) => {
	//			const location = new Location(this.request.path, this.request.query);
	//			const routes = require('./../build/routes-compiled');
	//			Router.run(routes, location, (error, initialState) => {
	//				if (error) {
	//					return reject(error);
	//				}
	//				resolve(initialState);
	//			});
	//		});
	//
	//	const router = (
	//		<Router {...routerProps} />
	//	);
	//	let store = createReduxStore(reducers, {});
	//	markup = ReactDOM.renderToString(
	//		<Application router={router} store={store} />
	//	);
	//} catch (ex) {
	//	console.log(ex);
	//	markup = '';
	//}

	const html = ReactDOM.renderToStaticMarkup(
		<Html {...stats} />
	);

	this.body = `<!doctype>${html}`;
});

app.listen(port, () => {
	console.log(green(`App is running at http://localhost:${port}`));
});
