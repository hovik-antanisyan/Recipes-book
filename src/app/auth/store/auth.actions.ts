export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class Signup {
  readonly type = SIGNUP;
}

export class Signin {
  readonly type = SIGNIN;
}

export class Logout {
  readonly type = LOGOUT;
}

export class SetToken {
  readonly type = SET_TOKEN;

  constructor(payload: string) {}
}

export type AuthActions =
  Signup |
  Signin |
  Logout |
  SetToken;

