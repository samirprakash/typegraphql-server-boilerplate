/* 
gCall returns a graphql instance with the schema and values required for executing the mutation or query.
*/
import { graphql, GraphQLSchema } from "graphql";
import Maybe from "graphql/tsutils/Maybe";
import createSchema from "../../utils/schema/create";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: number;
}

let schema: GraphQLSchema;

const gCall = async ({ source, variableValues, userId }: Options) => {
  // build schema only if the schema does not already exist to expedite execution time
  if (!schema) {
    schema = await createSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId
        }
      },
      res: {
        clearCookie: jest.fn()
      }
    }
  });
};

export default gCall;
