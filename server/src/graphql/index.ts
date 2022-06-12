import { GraphQLSchema } from "graphql";
import { mutation } from "./mutation";

import { RootQuery } from "./root";

export const schema = new GraphQLSchema({ query: RootQuery, mutation });
