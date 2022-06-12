import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { IProject, Client } from "../models";
import { ClientType } from "./client";

export const ProjectType = new GraphQLObjectType<IProject>({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});
