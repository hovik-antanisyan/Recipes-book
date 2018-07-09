import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, NavigationEnd, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromAuth from './store/auth.reducers';
import * as fromApp from '../store/app.reducers';
import {Store} from '@ngrx/store';
import {map, tap} from 'rxjs/internal/operators';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth')
      .pipe(
        map((authState: fromAuth.State) => {
          return authState.authenticated;
        }),
        tap((authenticated: boolean) => {
          if (!authenticated) {
            this.router.navigate(['user', 'signin'], {queryParams: {back: state.url}});
          }
        }),
      );
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}