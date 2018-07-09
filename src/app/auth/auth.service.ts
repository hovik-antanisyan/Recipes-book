import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import * as AuthActions from './store/auth.actions';
import {User} from './auth.model';
import {throwError} from 'rxjs';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
  }

  signup(user: User) {
    return this.http.post(`${this.apiUrl}user/signup`, user)
      .pipe(
        tap((response: any) => {
          this.store.dispatch(new AuthActions.Signup());
        }),
        map((response: any) => {
          return response.user;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(errorResponse.error.message);
        }));
  }

  signin(email: string, password: string) {
    return this.http.post(`${this.apiUrl}user/signin`, {email, password})
      .pipe(
        tap((response: any) => {
          this.store.dispatch(new AuthActions.Signin());
          this.store.dispatch(new AuthActions.SetToken(response.token));
          // this.setSession(response);
        }),
        shareReplay(),
        map((response: any) => {
          return response.success;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          return throwError(errorResponse.error.message);
        })
      );
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('authToken');
    localStorage.removeItem('authExpiredAt');
  }

  setSession(authResult) {
    localStorage.setItem('authToken', authResult.token);
    localStorage.setItem('authExpiredAt', authResult.expiresAt);
  }

  /*isLoggedIn() {
    const expiredAt = new Date(localStorage.getItem('authExpiredAt'));
    return new Date() < expiredAt;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }*/

  getToken() {
    return localStorage.getItem('authToken');
  }

  getExpireDate() {
    return localStorage.getItem('authExpiredAt');
  }

  getExpireInterval() {
    return Math.floor(((+new Date(this.getExpireDate()) - +new Date()) / 1000 / 3600)) + ' hours';
  }

  getUserExcept(email: string) {
    return this.http.post(`${this.apiUrl}user/except`, {email})
      .pipe(map((response: any) => {
        return response.exists ? {'notUniqueEmail': `User email <b>${email}</b> has already been taken.`} : null;
      }))
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }
}