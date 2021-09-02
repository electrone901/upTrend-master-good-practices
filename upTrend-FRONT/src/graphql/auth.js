import gql from 'graphql-tag';

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      ok
      user {
        id
        firstName
        lastName
        gender
        avatar
        role
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      user {
        id
        firstName
        lastName
        gender
        avatar
        role
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation {
    logout {
      ok
    }
  }
`;

export const CREATE_USER = gql`
  mutation($input: RegisterInput!) {
    register(input: $input) {
      ok
      user {
        id
        firstName
        lastName
      }
      errors {
        path
        message
      }
    }
  }
`;
