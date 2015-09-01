import React from 'react';
import Relay, {Route} from 'react-relay';
import Home from './../components/pages/Home';

const path = '/';
export class HomeRelayRoute extends Route {
	static routeName = 'HomeRoute';
	static path = path;
	static queries = {
		article: (Component) => Relay.QL`
			query {
				article(id: $id) {
					${Component.getFragment('article')}
				}
			}
		`
	};
}

export const HomeRoute = (
	<Route component={Home} path={path} />
);
