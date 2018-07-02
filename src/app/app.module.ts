import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {
  ErrorStateMatcher,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MyErrorStateMatcher} from './shared/my-error-state-matcher';
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    ShoppingListService,
    AuthService,
    AuthGuardService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      }
    },
    {
      provide: ErrorStateMatcher,
      useClass: MyErrorStateMatcher
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
