export class Blog extends Object {
}

// Fake data storage
let blog = new Blog();
blog.id = 0;
blog.title = 'My Blog Title';
blog.articles = [0, 1, 2, 3];

export function getBlog() {
	return blog;
}
