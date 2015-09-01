import React, {PropTypes} from 'react';
import Relay from 'react-relay';

export default class ArticleFeed extends React.Component {
	render() {
		const {
			article: {id, title}
			} = this.props;
		return (
			<article>
				<h1>{title}</h1>
			</article>
		);
	}
}

export default Relay.createContainer(ArticleFeed, {
	fragments: {
		article: () => Relay.QL`
			fragment on Article {
				id,
				title
			}
		`
	}
});
