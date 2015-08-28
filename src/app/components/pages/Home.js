import React from 'react';
import Relay from 'react-relay';

export default class Home extends React.Component {
	static propTypes = {};
	static defaultProps = {};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div>
				<h1>Home</h1>
			</div>
		);
	}
}

export default Relay.createContainer(Home, {
	fragments: {
		prop1: () => Relay.QL`

		`
	}
});
