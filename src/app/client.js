import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/root/Application';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import HashHistory from 'react-router/lib/HashHistory';
import Relay from 'react-relay';
import DefaultNetworkLayer from 'react-relay/lib/RelayDefaultNetworkLayer';
import {routes, relayRoutes} from './routes.js';

Relay.injectNetworkLayer(new DefaultNetworkLayer(process.env.GRAPHQL_PATH));

let history;
try {
	history = new BrowserHistory();
} catch (ex) {
	history = new HashHistory();
}
ReactDOM.render((
	<Application history={history} relayRoutes={relayRoutes} routes={routes} />
), document.getElementById('mount'));
