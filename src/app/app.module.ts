import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/app.reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
import {ShoppingListEffects} from './shopping-list/store/shopping-list.effects';

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
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, ShoppingListEffects])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
