import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
  mutation AddProject($name: String!, $description: String!, $clientId: ID!) {
    addProject(name: $name, description: $description, clientId: $clientId) {
      name
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String
    $description: String
    $status: ProjectStatusUpdate
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      name
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation RemoveProject($id: ID!) {
    removeProject(id: $id) {
      name
    }
  }
`;
