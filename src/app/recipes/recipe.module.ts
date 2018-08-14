import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RecipeRoutingModule} from './recipe-routing.module';
import {RecipesComponent} from './recipes.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeService} from './recipe.service';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatCardModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {recipeReducers} from './store/recipe.reducers';
import {EffectsModule} from '@ngrx/effects';
import {RecipeEffects} from './store/recipe.effects';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducers),
    EffectsModule.forFeature([RecipeEffects]),
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule
  ],
  providers: [RecipeService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      }
    }]
})
export class RecipeModule {
}
