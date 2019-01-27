import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";

const main = async () => {
  // Create connection with postgres based on ormconfig.json
  await createConnection();

  // Define a schema and register the resolvers
  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });

  // Create an instance of Apollo Server with the schema
  // Schema internally contains reference to the resolvers
  const apolloServer = new ApolloServer({ schema });

  const app = Express();

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
