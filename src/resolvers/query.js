import getUserId from '../utils/getUserId';

const Query = {
  users: (parent, { query, first, skip, after, orderBy }, { prisma }, info) => {
    const opArgs = {
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    if (query) {
      opArgs.where.OR = [
        {
          name_contains: query
        }
      ];
    }

    return prisma.query.users(opArgs, info);
  },
  posts: (parent, { query, first, skip, after, orderBy }, { prisma }, info) => {
    const opArgs = {
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy,
      where: {
        published: true
      }
    };

    if (query) {
      opArgs.where.OR = [
        {
          title_contains: query
        },
        {
          body_contains: query
        }
      ];
    }
    return prisma.query.posts(opArgs, info);
    // return db.posts;
  },
  comments: (parent, { first, skip, after, orderBy }, { prisma }, info) => {
    const opArgs = {
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    return prisma.query.comments(opArgs, info);
  },
  post: async (parent, { id }, { prisma, request }, info) => {
    const userId = getUserId(request, false);

    const posts = await prisma.query.posts({
      where: {
        id: id,
        OR: [
          {
            published: true
          },
          {
            author: { id: userId }
          }
        ]
      }
    });

    if (posts.length === 0) throw new Error('Post not found');

    return posts[0];
  }
};

export { Query as default };
