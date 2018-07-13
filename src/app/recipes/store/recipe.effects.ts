import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import {mergeMap, switchMap} from 'rxjs/operators';
import {map, tap} from 'rxjs/internal/operators';
import {Recipe} from '../recipe.model';
import {Router} from '@angular/router';

@Injectable()
export class RecipeEffects {
  private apiUrl = 'http://localhost:3000/recipes';

  @Effect()
  setRecipes = this.actions
    .ofType(RecipeActions.TRY_SET_RECIPES)
    .pipe(
      switchMap(
        (action: RecipeActions.TrySetRecipes) => {
          return this.http.get(this.apiUrl);
        }
      ),
      mergeMap((response: any) => {
        return [{type: RecipeActions.SET_RECIPES, payload: response.recipes}];
      })
    );

  @Effect()
  addRecipe = this.actions
    .ofType(RecipeActions.TRY_ADD_RECIPE)
    .pipe(
      switchMap((action: RecipeActions.TryAddRecipe) => {
        return this.http.post(this.apiUrl, action.payload);
      }),
      tap((response: any) => {
        this.router.navigateByUrl('/recipes');
      }),
      map((response: any) => response.recipe),
      map((recipe: Recipe) => ({type: RecipeActions.ADD_RECIPE, payload: recipe}))
    );

  @Effect({dispatch: false})
  updateRecipe = this.actions
    .ofType(RecipeActions.UPDATE_RECIPE)
    .pipe(
      switchMap((action: RecipeActions.UpdateRecipe) => {
        return this.http.put(`${this.apiUrl}/${action.payload._id}/edit`, action.payload.recipe);
      }),
      tap((response: any) => this.router.navigateByUrl('/recipes')),
    );

  @Effect({dispatch: false})
  deleteRecipe = this.actions
    .ofType(RecipeActions.DELETE_RECIPE)
    .pipe(
      switchMap((action: RecipeActions.DeleteRecipe) => {
          return this.http.delete(this.apiUrl + '/' + action.payload);
        }
      ),
      tap((response: any) => {
        this.router.navigateByUrl('/recipes');
      }),
    );

  constructor(private actions: Actions, private http: HttpClient, private router: Router) {
  }
}
