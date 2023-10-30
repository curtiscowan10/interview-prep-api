const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { getNotes, getNoteById } = require('./src/helpers/dbHelpers.js');
const config = require('./environment.js').default;
const app = express();

const port = config.port;

// Define GraphQL schema
const schema = buildSchema(`
  type Note {
    id: Int
    title: String
    content: String
  }

  type Query {
    notes: [Note]
    getNoteById(id: Int!): Note
  }
`);

const root = {
  notes: getNotes,
  getNoteById: async ({ id }) => {
    return await getNoteById(id);
  },
};

// Middleware for GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for testing
  })
);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
