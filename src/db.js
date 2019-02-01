const users = [
  {
    id: '1',
    name: 'aaa',
    email: 'aaa@gmail.com'
  },
  {
    id: '2',
    name: 'abb',
    email: 'bbb@gmail.com'
  },
  {
    id: '3',
    name: 'acc',
    email: 'ccc@gmail.com'
  }
];

const posts = [
  {
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQl...',
    published: true,
    author: '1'
  },
  {
    id: '11',
    title: 'GraphQL 102',
    body: 'This is how to use GraphQl post...',
    published: true,
    author: '1'
  },
  {
    id: '12',
    title: 'GraphQL 103',
    body: 'This is how to use GraphQl with node...',
    published: false,
    author: '2'
  }
];

const comments = [
  {
    id: '101',
    text: 'This worked well for me. Thanks!',
    author: '1',
    post: '10'
  },
  {
    id: '102',
    text: 'Glad you enjoyed it.',
    author: '2',
    post: '10'
  },
  {
    id: '103',
    text: 'This did no work.',
    author: '3',
    post: '11'
  },
  {
    id: '104',
    text: 'Nevermind. I got it to work.',
    author: '3',
    post: '12'
  }
];

const db = { users, posts, comments };

export { db as default };
