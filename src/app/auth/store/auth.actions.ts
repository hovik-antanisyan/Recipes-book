import {User} from '../auth.model';

export const KEEP_SIGNED_IN = 'KEEP_SIGNED_IN';
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class KeepSignedIn {
  readonly type = KEEP_SIGNED_IN;
}

export class TrySignup {
  readonly type = TRY_SIGNUP;

  constructor(public payload: User) {}
}

export class TrySignin {
  readonly type = TRY_SIGNIN;

  constructor(public payload: User) {}
}

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

  constructor(public payload: {token: string, expiresAt: string}) {}
}

export type AuthActions =
  Signup |
  Signin |
  Logout |
  SetToken |
  TrySignin |
  TrySignup |
  KeepSignedIn;

