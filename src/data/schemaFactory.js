import {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql';

import {
	connectionArgs,
	connectionDefinitions,
	connectionFromArray,
	fromGlobalId,
	globalIdField,
	nodeDefinitions,
} from 'graphql-relay';

import {
	Blog,
	getBlog
} from './dataAccess/Blog';

import {
	Article,
	getArticle
} from './dataAccess/Article';

export default function schemaFactory() {
	return new GraphQLSchema({
		//mutation: mutationType,
		query: queryType
	});
}

const queryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		node: nodeField,
		blog: {
			type: blogType,
			resolve: () => getBlog()
		},
		article: {
			type: articleType,
			args: {
				id: {
					name: 'id',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: (root, {id}) => getArticle(parseInt(fromGlobalId(id).id, 10))
		}
	})
});

//const mutationType = new GraphQLObjectType({
//	name: 'Mutation',
//	fields: () => ({
//		// Add your own mutations here
//	})
//});

const {nodeInterface, nodeField} = nodeDefinitions(
	(globalId) => {
		const {type, id} = fromGlobalId(globalId);
		switch (type) {
			case 'Blog':
				return getBlog();
			case 'Article':
				return getArticle(id);
			default:
				return null;
		}
	},
	(obj) => {
		if (obj instanceof Blog) {
			return blogType;
		} else if (obj instanceof Article) {
			return articleType;
		}
		return null;
	}
);

const blogType = new GraphQLObjectType({
	name: 'Blog',
	description: 'A blog of articles written by a single author',
	fields: () => ({
		id: globalIdField('Blog'),
		title: {
			type: GraphQLString,
			description: 'The title of the blog'
		},
		articles: {
			type: articleConnection,
			description: 'The collection of articles of the blog',
			args: connectionArgs,
			resolve: (_, args) => {
				return connectionFromArray(_.articles.map(id=> getArticle(id)), args);
			}
		}
	}),
	interfaces: [nodeInterface]
});

const articleType = new GraphQLObjectType({
	name: 'Article',
	description: 'A blog article',
	fields: () => ({
		id: globalIdField('Article'),
		title: {
			type: GraphQLString,
			description: 'The title of the blog'
		}
	}),
	interfaces: [nodeInterface]
});

const {connectionType: articleConnection} = connectionDefinitions({name: 'Article', nodeType: articleType});
