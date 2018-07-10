import {Actions, Effect} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {map, mergeMap, switchMap} from 'rxjs/internal/operators';
import {User} from '../auth.model';
import {HttpClient} from '@angular/common/http';
import {SET_TOKEN} from './auth.actions';

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
      mergeMap(
        (result: any) => {
          return [
            {type: AuthActions.SIGNUP},
            {type: SET_TOKEN, payload: result.token}
          ];
        }
      )
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}
