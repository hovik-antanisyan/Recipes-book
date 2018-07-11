import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {AuthService} from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../store/auth.reducers';
import * as AuthActions from '../store/auth.actions';
import {take} from 'rxjs/internal/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  redirectUrl = '/recipes';

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.route.queryParams
      .subscribe((params: Params) => {
        if ( params.back) {
          this.redirectUrl = params.back;
        }
      });

    this.store.select('auth')
      .subscribe((authState: fromAuth.State) => {
        if (authState.authenticated) {
          this.snackBar.open(
            'You have successfully logined.',
            'OK',
          );
          this.router.navigateByUrl(this.redirectUrl);
        }
      });
  }

  onSubmit() {
    this.store.dispatch(new AuthActions.TrySignin(this.signInForm.value));
  }

}
