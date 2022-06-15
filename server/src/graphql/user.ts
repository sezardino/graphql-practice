import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { IClient } from "../models";
import { ITokens, IUser } from "../models/user";

export const TokensType = new GraphQLObjectType<ITokens>({
  name: "Tokens",
  fields: () => ({
    access: { type: GraphQLString },
    refresh: { type: GraphQLString },
  }),
});

export const UserType = new GraphQLObjectType<IUser>({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    password: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    tokens: {
      type: TokensType,
    },
  }),
});
