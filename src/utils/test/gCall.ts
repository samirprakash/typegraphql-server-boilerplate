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
}

let schema: GraphQLSchema;

const gCall = async ({ source, variableValues }: Options) => {
  // build schema only if the schema does not already exist to expedite execution time
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues
  });
};

export default gCall;
