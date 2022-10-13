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

export const RECOVER_ACCOUNT_MUTATION = gql`
  mutation recoverAccount(
    $code: String!
    $confirmPassword: String!
    $password: String!
    $username: String!
  ) {
    recoverAccount(
      code: $code
      confirmPassword: $confirmPassword
      password: $password
      username: $username
    ) {
      accessToken
      recoveryCodes
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
