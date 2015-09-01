import React, {PropTypes} from 'react';
import Router from 'react-router';
import Relay, {Route} from 'react-relay';

export default class extends React.Component {
	static propTypes = {
		children: PropTypes.any,
		history: PropTypes.object,
		relayRoutes: PropTypes.arrayOf(PropTypes.func).isRequired,
		router: PropTypes.object,
		routes: PropTypes.arrayOf(PropTypes.object).isRequired
	};

	constructor(props, context) {
		super(props, context);
		this.state = {mounted: false};
	}

	componentDidMount() {
		this.setState({mounted: true});
	}

	render() {
		if (process.env.BROWSER) {
			const {
				history,
				routes
				} = this.props;
			return (
				<Router
					children={routes}
					createElement={createRouter.bind(this)}
					history={history} />
			);
		}
		return this.props.router;
	}
}

function createRouter(Route, props) {
	if (!Relay.isContainer) {
		return (
			<Route {...props} />
		);
	}
	const {
		relayRoutes
		} = this.props;
	const relayRouteElements = relayRoutes
		.filter(route=> isMatchingRoute(route, props.route));

	if (!relayRouteElements.length) {
		console.error(`ERROR: Path ${props.route.path} does not match any Relay Routes`);
		return false;
	}
	const RelayRoute = relayRouteElements[0];
	return (
		<Relay.RootContainer
			Component={Route}
			route={new RelayRoute(props.params)} />
	);
}

function isMatchingRoute(relayRoute, route) {
	return (relayRoute !== '__esModule') && (relayRoute.path === route.path);
}