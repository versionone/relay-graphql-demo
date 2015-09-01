import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import ArticleSummary from './ArticleSummary';

export default class ArticleFeed extends React.Component {
	render() {
		const {
			blog: {
				articles,
				articles: {pageInfo}
				}
			} = this.props;
		return (
			<div>
				<ol>
					{articles.edges.map((edge, index) =>
							<li key={index}>
								<ArticleSummary key={edge.node.id} article={edge.node} />
							</li>
					)}
				</ol>
				<footer>
					<button disabled={!pageInfo.hasNextPage} onClick={loadMoreArticles.bind(this)}>load one more...</button>
				</footer>
			</div>
		);
	}
}

export default Relay.createContainer(ArticleFeed, {
	initialVariables: {
		count: 2
	},
	fragments: {
		blog: () => Relay.QL`
			fragment on Blog {
				articles(first: $count) {
					pageInfo {
						hasNextPage,
						hasPreviousPage,
						startCursor,
						endCursor
					},
					edges {
						node {
							${ArticleSummary.getFragment('article')}
						}
					}
				}
			}
		`
	}
});

function loadMoreArticles() {
	this.props.relay.setVariables({
		count: this.props.relay.variables.count + 1
	});
}
