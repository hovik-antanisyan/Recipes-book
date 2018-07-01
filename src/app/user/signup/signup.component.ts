import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {User} from '../user.model';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    public authService: AuthService) {
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], this.emailUniqueValidator.bind(this)],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    }, {
      validator: this.matchPassword.bind(this)
    });
  }

  matchPassword(control: AbstractControl): { [key: string]: string } | null {
    if (control.get('password').value !== control.get('passwordConfirm').value) {
      control.get('passwordConfirm').setErrors({passwordConfirm: 'Passwords do not match.'});
    }
    else {
      return null;
    }
  }

  emailUniqueValidator(control: FormControl): Observable<{ [key: string]: string }> | Observable<null> {
    return this.authService.getUserExcept(control.value);
  }

  onSubmit() {
    this.authService.signup(this.signUpForm.value)
      .subscribe(
        (user: User) => {
          this.snackBar.open(
            'You have successfully registered.',
            'OK',
          );
          this.router.navigate(['user', 'signin']);
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
