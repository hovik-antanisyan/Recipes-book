import {Actions, Effect} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {map, mergeMap, switchMap, tap} from 'rxjs/internal/operators';
import {User} from '../auth.model';
import {HttpClient} from '@angular/common/http';
import {SET_TOKEN} from './auth.actions';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthEffects {
  apiUrl = 'http://localhost:3000/';

  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .pipe(
      map((action: AuthActions.TrySignup) => {
        return action.payload;
      }),
      switchMap(
        (user: User) => {
          return this.http.post(`${this.apiUrl}user/signup`, user);
        }
      ),
      tap((result: any) => {
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('authExpiresAt', result.expiresAt);
      }),
      mergeMap(
        (result: any) => {
          return [
            {type: AuthActions.SIGNUP},
            {type: SET_TOKEN, payload: result.token}
          ];
        }
      )
    );

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .pipe(
      map((action: AuthActions.TrySignin) => {
        return action.payload;
      }),
      switchMap(
        (user: User) => {
          return this.http.post(`${this.apiUrl}user/signin`, user);
        }
      ),
      tap((result: any) => {
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('authExpiresAt', result.expiresAt);
      }),
      mergeMap(
        (result: any) => {
          return [
            {type: AuthActions.SIGNIN},
            {type: SET_TOKEN, payload: result.token, expiresAt: result.expiresAt}
          ];
        }
      )
    );

  @Effect()
  keepSignedIn = this.actions$
    .ofType(AuthActions.KEEP_SIGNED_IN)
    .pipe(
      mergeMap((action: AuthActions.KeepSignedIn) => {
        const expiredAt = new Date(localStorage.getItem('authExpiresAt'));
        if (+new Date() < +expiredAt && localStorage.getItem('authToken')) {
          return [
            {
              type: AuthActions.SIGNIN
            },
            {
              type: SET_TOKEN,
              payload: {
                token: localStorage.getItem('authToken'),
                expiresAt: localStorage.getItem('authExpiresAt')
              }
            }
          ];
        } else {
          return [];
        }
      })
    );

  constructor(private actions$: Actions, private http: HttpClient) {
  }
}
