import { gql } from "@apollo/client";

export const REMOVE_CLIENT = gql`
  mutation RemoveClient($id: ID!) {
    removeClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export const ADD_CLIENT = gql`
  mutation AddClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;
