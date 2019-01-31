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
