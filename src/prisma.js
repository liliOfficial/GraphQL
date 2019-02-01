import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements
});

export { prisma as default };

// prisma.query.users(null, '{ id name email posts { id title } }').then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query.comments(null, '{ id text author { id name } }').then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// const createPostForUser = async (authorId, data) => {
//   const userExiste = await prisma.exists.User({ id: authorId });

//   if (!userExiste) throw new Error('Error: User not found');

//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     '{ id }'
//   );
//   const user = await prisma.query.user(
//     {
//       where: {
//         id: authorId
//       }
//     },
//     '{ id name email posts { id title published body } }'
//   );
//   return user;
// };

// createPostForUser('cjr18k4ov005r0964xf0847j0', {
//   title: 'Post from node',
//   body: 'Something Something Something post from node await',
//   published: true
// })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   })
//   .catch(e => {
//     console.log(e.message);
//   });
