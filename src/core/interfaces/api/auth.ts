export interface LogInVariables {
  username: string;
  password: string;
}

export interface LogInResponse {
  logIn: {
    accessToken: string;
  };
}

export interface LogInTwoFactorVariables {
  code: string;
}

export interface LogInTwoFactorResponse {
  logInTwoFactor: {
    accessToken: string;
  };
}

export interface RecoverAccountVariables {
  code: string;
  confirmPassword: string;
  password: string;
  username: string;
}

export interface RecoverAccountResponse {
  recoverAccount: {
    accessToken: string;
    recoveryCodes: string[];
  };
}

export interface SignUpVariables {
  username: string;
  password: string;
  confirmPassword: string;
  betaKey: string;
  terms: boolean;
}

export interface SignUpResponse {
  signUp: {
    accessToken: string;
    recoveryCodes: string[];
  };
}
