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

export interface LogInTwoFactorVariables {
  code: string;
}

export interface LogInTwoFactorResponse {
  logInTwoFactor: {
    accessToken: string;
  };
}

export const LOGIN_TWO_FACTOR_QUERY = gql`
  query logInTwoFactor($code: String!) {
    logInTwoFactor(code: $code) {
      accessToken
    }
  }
`;

export interface SignUpVariables {
  username: string;
  password: string;
  confirmPassword: string;
  betaKey: string;
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
    $betaKey: String!
  ) {
    signUp(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
      betaKey: $betaKey
    ) {
      accessToken
      recoveryCodes
    }
  }
`;
