import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { hashSync, compareSync } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { Client, Project, User } from "../models";
import { ClientType } from "./client";
import { ProjectType } from "./project";
import { UserType } from "./user";
import { JwtPayload } from "../types";

const getTokens = (payload: Record<string, string>) => {
  const access = sign(payload, process.env.JWT_SECRET_ACCESS!, {
    expiresIn: "1d",
  });
  const refresh = sign(payload, process.env.JWT_SECRET_REFRESH!, {
    expiresIn: "30d",
  });

  return { access, refresh };
};

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
    removeClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.remove();
          });
        });

        return Client.findByIdAndRemove(args.id);
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString, defaultValue: "" },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
      },
      resolve(_, args) {
        const project = new Project({ ...args });

        return project.save();
      },
    },
    removeProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(_, args) {
        return Project.findByIdAndUpdate(args.id, args);
      },
    },

    // auth

    registration: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args, context) {
        const hasUser = await User.findOne({ email: args.email });

        if (hasUser) {
          throw new Error("User already exists");
        }

        const password = hashSync(args.password, +process.env.BCRYPT_SALT!);

        const tokens = getTokens({ email: args.email });

        return await User.create({
          ...args,
          password,
          tokens,
        });
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        const user = await User.findOne({ email: args.email });

        if (!user) {
          throw new Error("User not found");
        }

        const passValidation = compareSync(args.password, user.password);

        if (!passValidation) {
          throw new Error("Password is incorrect");
        }

        user.tokens = getTokens({ email: user.email, username: user.username });

        return user.save();
      },
    },
    logout: {
      type: UserType,
      async resolve(a, b, context) {
        if (context.email) {
          throw new Error("User not found");
        }

        return await User.findOneAndUpdate(
          { email: context.email },
          { tokens: { refresh: "", access: "" } }
        );
      },
    },
    refresh: {
      type: UserType,
      args: {
        refreshToken: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        const payload = verify(
          args.refreshToken,
          process.env.JWT_SECRET_REFRESH || ""
        );

        if (!payload || typeof payload !== "object") {
          throw new Error("Invalid refresh token");
        }

        const user = await User.findOne({ email: payload.email });

        if (!user) {
          throw new Error("User not found");
        }

        user.tokens = getTokens({ email: user.email, username: user.username });

        return user.save();
      },
    },
  },
});
