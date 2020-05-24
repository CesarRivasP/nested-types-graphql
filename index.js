'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const { readFileSync } = require('fs');
const express = require('express');
const gqlMiddleware = require('express-graphql');
const root = require('./lib/resolvers');
const { join } = require('path');

const app = express();
const PORT = process.env.port || 3000;
const resolvers = require('./lib/resolvers')
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}/api`);
});