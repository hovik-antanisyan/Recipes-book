import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../store/auth.reducers';
import * as AuthActions from '../store/auth.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private store: Store<fromAuth.State>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigateByUrl('/');
  }

}
