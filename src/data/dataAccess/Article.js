export class Article extends Object {
}

// Fake data storage
const articles = [];
let article1 = new Article();
article1.id = 0;
article1.title = 'What is React?';
let article2 = new Article();
article2.id = 1;
article2.title = 'What is Relay?';
let article3 = new Article();
article3.id = 2;
article3.title = 'What is GraphQL?';
let article4 = new Article();
article4.id = 3;
article4.title = 'GraphQL in C#';
articles.push(article1, article2, article3, article4);

export function getArticle(id) {
	return articles.find(item=>item.id === id);
}