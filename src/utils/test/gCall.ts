import { graphql } from "graphql";
import Maybe from "graphql/tsutils/Maybe";
import createSchema from "../schema/create";

interface Options {
  source: string;
  variableValues: Maybe<{
    [key: string]: any;
  }>;
}

const gCall = async ({ source, variableValues }: Options) => {
  return graphql({
    schema: await createSchema(),
    source,
    variableValues
  });
};

export default gCall;
