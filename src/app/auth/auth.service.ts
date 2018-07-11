import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class AuthService {
  apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
  }


  /*getExpireInterval() {
    return Math.floor(((+new Date(this.getExpireDate()) - +new Date()) / 1000 / 3600)) + ' hours';
  }*/

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
