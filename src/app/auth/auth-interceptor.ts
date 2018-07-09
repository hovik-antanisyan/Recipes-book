import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromAuth from './store/auth.reducers';
import * as fromApp from '../store/app.reducers';
import {switchMap, take} from 'rxjs/internal/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth')
      .pipe(
        take(1),
        switchMap(
          (authState: fromAuth.State) => {
            const idToken = authState.token;
            if (idToken) {
              const cloned = req.clone({
                headers: req.headers.set('Authorization',
                  `Bearer ${idToken}`)
              });
              return next.handle(cloned);
            } else {
              return next.handle(req);
            }
          })
      );
  }
}
