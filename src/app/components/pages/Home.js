import React, {PropTypes} from 'react';
import Relay from 'react-relay';

export default class Home extends React.Component {
	static propTypes = {
		blog: PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		})
	};
	static defaultProps = {};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		const {
			blog: {title}
			} = this.props;
		return (
			<div>
				<h1>{title}</h1>
			</div>
		);
	}
}

export default Relay.createContainer(Home, {
	fragments: {
		blog: () => Relay.QL`
			fragment on Blog {
				id,
				title
			}
		`
	}
});
