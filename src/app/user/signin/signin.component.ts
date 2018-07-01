import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material';
import {User} from '../user.model';

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
  }

  onSubmit() {
    this.authService.signin(this.signInForm.value.email, this.signInForm.value.password)
      .subscribe(
        (user: User) => {
          this.snackBar.open(
            'You have successfully logined.',
            'OK',
          );
          this.router.navigateByUrl(this.redirectUrl);
        },
        (error: any) => {
          this.snackBar.open(
            error,
            'OK',
            {
              panelClass: 'error'
            }
          );
        }
      );
  }

}
