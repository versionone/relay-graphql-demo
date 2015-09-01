import React from 'react';
import Relay, {Route} from 'react-relay';
import Home from './../components/pages/Home';

const path = '/';
export class HomeRelayRoute extends Route {
	static routeName = 'HomeRoute';
	static path = path;
	static queries = {
		blog: (Component) => Relay.QL`
			query {
				blog {
					${Component.getFragment('blog')}
				}
			}
		`
	};
}

export const HomeRoute = (
	<Route component={Home} path={path} />
);
