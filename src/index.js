import '@babel/polyfill/noConflict';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import { truncate } from 'fs';

import db from './db';
import { resolvers, fragmentReplacements } from './resolvers/index';
import prisma from './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request
    };
  },
  fragmentReplacements
});
const options = {
  port: process.env.PORT || 8000
  // endpoint: '/graphql',
  // subscriptions: '/subscriptions',
  // playground: '/playground',
};

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
);
