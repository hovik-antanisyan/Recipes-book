import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import {mergeMap, switchMap} from 'rxjs/operators';

@Injectable()
export class RecipeEffects {
  private apiUrl = 'http://localhost:3000/recipes';

  @Effect()
  SetRecipes = this.actions
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

  constructor(private actions: Actions, private http: HttpClient) {}
}