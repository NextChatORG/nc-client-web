import { gql } from '@apollo/client';

export interface LogInVariables {
  username: string;
  password: string;
}

export interface LogInResponse {
  logIn: {
    accessToken: string;
  };
}

export const LOGIN_MUTATION = gql`
  mutation logIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      accessToken
    }
  }
`;

export interface SignUpVariables {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  signUp: {
    accessToken: string;
    recoveryCodes: string[];
  };
}

export const SIGNUP_MUTATION = gql`
  mutation signUp(
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      accessToken
      recoveryCodes
    }
  }
`;
