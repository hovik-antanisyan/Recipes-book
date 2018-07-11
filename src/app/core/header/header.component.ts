import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  constructor(private store: Store<fromApp.AppState>, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.dispatch(new AuthActions.KeepSignedIn());
  }

  get isLoggedIn(): Observable<fromAuth.State> {
    return this.store.select('auth');
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
}
