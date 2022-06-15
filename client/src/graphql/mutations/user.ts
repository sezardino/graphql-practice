import { gql } from "@apollo/client";

export const REFRESH_USER = gql`
  mutation Refresh($refreshToken: String!) {
    refresh(refreshToken: $refreshToken) {
      id
      username
      tokens {
        access
        refresh
      }
    }
  }
`;

// export const LOGIN = gql`
//   mutation Login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       id
//       username
//       email
//       tokens {
//         access
//         refresh
//       }
//     }
//   }
// `;

// export const REGISTER = gql`
//   mutation Registration(
//     $username: String!
//     $email: String!
//     $password: String!
//   ) {
//     registration(username: $username, email: $email, password: $password) {
//       id
//       username
//       email
//       tokens {
//         access
//         refresh
//       }
//     }
//   }
// `;

// export const LOGOUT = gql`
//   mutation Logout() {
//     registration(username: $username, email: $email, password: $password) {
//       id
//       username
//     }
//   }
// `;
