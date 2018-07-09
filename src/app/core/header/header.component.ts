import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  constructor(private store: Store<fromApp.AppState>, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  get isLoggedIn(): Observable<fromAuth.State> {
    // this.store.select('auth')
    //   .subscribe(res => {console.log(res); });
    return this.store.select('auth');
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
}
