import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { IClient } from "../models";

export const ClientType = new GraphQLObjectType<IClient>({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});
