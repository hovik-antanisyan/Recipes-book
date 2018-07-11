import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  expiresAt: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  expiresAt: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    /*case AuthActions.KEEP_SIGNED_IN:
      return {
        ...state,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
      };*/
    case AuthActions.SIGNUP:
    case AuthActions.SIGNIN:
      return {
        ...state,
        authenticated: true
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null,
        expiresAt: null
      };
    case AuthActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
      };
    default:
    return state;
  }
}
