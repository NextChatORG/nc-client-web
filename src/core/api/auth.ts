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

export const GENERATE_TWO_FACTOR_QR_CODE_MUTATION = gql`
  mutation generateTwoFactorQRCode($currentPassword: String!) {
    generateTwoFactorQRCode(currentPassword: $currentPassword)
  }
`;

export const VERIFY_TWO_FACTOR_CODE_MUTATION = gql`
  mutation verifyTwoFactorCode($code: String!) {
    verifyTwoFactorCode(code: $code)
  }
`;

export const DISABLE_TWO_FACTOR_MUTATION = gql`
  mutation disableTwoFactor($currentPassword: String!) {
    disableTwoFactor(currentPassword: $currentPassword)
  }
`;
