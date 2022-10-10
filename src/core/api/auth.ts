import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation logIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      accessToken
    }
  }
`;

export const LOGIN_TWO_FACTOR_QUERY = gql`
  query logInTwoFactor($code: String!) {
    logInTwoFactor(code: $code) {
      accessToken
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signUp(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $betaKey: String!
    $terms: Boolean!
  ) {
    signUp(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
      betaKey: $betaKey
      terms: $terms
    ) {
      accessToken
      recoveryCodes
    }
  }
`;
