import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "./config/cors";
import session from "./config/session";
import createSchema from "./utils/schema/create";

const main = async () => {
  // Use ormconfig.json for postgres connection
  await createConnection();

  // register the resolvers with schema
  const schema = await createSchema();

  // Create an instance of Apollo Server providing schema
  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req, res }: any) => ({ req, res })
  });

  const app = Express();
  app.use(cors);
  app.use(session);

  // Connect the express app with apollo server
  apolloServer.applyMiddleware({ app });

  // Start server and listen on port 4000
  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    )
  );
};

main();
