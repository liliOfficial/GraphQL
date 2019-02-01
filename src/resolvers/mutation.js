import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

const Mutation = {
  async createUser(parent, { data }, { prisma }, info) {
    // const emailTaken = await prisma.exists.User({ email: data.email });
    // if (emailTaken) throw new Error('Email taken.');
    const password = await hashPassword(data.password);

    const user = prisma.mutation.createUser({
      data: {
        ...data,
        password: password
      }
    });
    return {
      user,
      token: generateToken(user.id)
    };
  },
  async login(parent, { data }, { prisma }, info) {
    const user = await prisma.query.user({
      where: { email: data.email }
    });
    if (!user) throw new Error('User does not exist');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error('Wrong password');

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async deleteUser(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },
  async updateUser(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof data.password === 'string') {
      data.password = await hashPassword(data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: { id: userId },
        data: data
      },
      info
    );
  },
  createPost: (parent, { data }, { prisma, request }, info) => {
    const userId = getUserId(request);

    return prisma.mutation.createPost(
      {
        data: {
          title: data.title,
          body: data.body,
          published: data.published,
          author: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  },
  deletePost: async (parent, { id }, { prisma, request }, info) => {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: id,
      author: { id: userId }
    });

    if (!postExists) throw new Error('Unable to delete post');

    return prisma.mutation.deletePost(
      {
        where: { id: id }
      },
      info
    );
  },
  updatePost: async (parent, { id, data }, { prisma, request }, info) => {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: id,
      author: { id: userId }
    });

    if (!postExists) throw new Error('Unable to update post');

    return prisma.mutation.updatePost(
      {
        where: { id: id },
        data: data
      },
      info
    );
  },
  createComment: async (parent, { data }, { prisma, request }, info) => {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: data.post,
      published: true
    });

    if (!postExists) throw new Error('Unable to find post');

    return prisma.mutation.createComment(
      {
        data: {
          text: data.text,
          author: {
            connect: {
              id: userId
            }
          },
          post: {
            connect: {
              id: data.post
            }
          }
        }
      },
      info
    );
  },
  deleteComment: async (parent, { id }, { prisma, request }, info) => {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id: id,
      author: {
        id: userId
      }
    });

    if (!commentExists) throw new Error('Unable to delete comment');

    return prisma.mutation.deleteComment(
      {
        where: { id: id }
      },
      info
    );
  },
  updateComment: async (parent, { id, data }, { prisma, request }, info) => {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id: id,
      author: {
        id: userId
      }
    });

    if (!commentExists) throw new Error('Unable to update comment');

    return prisma.mutation.updateComment(
      {
        where: { id: id },
        data: data
      },
      info
    );
  }
};

export { Mutation as default };
