import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $description: String!
    $clientId: ID!
  ) {
    addProject(name: $name, description: $description, clientId: $clientId) {
      name
    }
  }
`;
