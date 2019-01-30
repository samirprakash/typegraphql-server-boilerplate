import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "./config/cors";
import session from "./config/session";
import { ConfirmUserResolver } from "./modules/user/ConfirmUser";
import { CurrentUserResolver } from "./modules/user/CurrentUser";
import { ForgotPasswordResolver } from "./modules/user/ForgotPassword";
import { LoginResolver } from "./modules/user/Login";
import { RegisterResolver } from "./modules/user/Register";

const main = async () => {
  // Use ormconfig.json for postgres connection
  await createConnection();

  // register the resolvers with schema
  const schema = await buildSchema({
    resolvers: [
      CurrentUserResolver,
      RegisterResolver,
      LoginResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver
    ]
  });

  // Create an instance of Apollo Server providing schema
  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req }: any) => ({ req })
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
