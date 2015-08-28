export class Article extends Object {
}

// Fake data storage
const articles = [];

export function getArticle(id) {
	return articles.find(item=>item.id === id);
}