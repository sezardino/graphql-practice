import { GraphQLSchema } from "graphql";

import { RootQuery } from "./root";

export const schema = new GraphQLSchema({ query: RootQuery });
