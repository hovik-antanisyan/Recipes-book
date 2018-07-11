import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect} from '@ngrx/effects';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';
import {mergeMap, switchMap} from 'rxjs/internal/operators';

@Injectable()
export class ShoppingListEffects {
  apiUrl = 'http://localhost:3000/ingredients';

  @Effect()
  loadIngredients = this.actions$
    .ofType(ShoppingListActions.TRY_GET_INGREDIENTS)
    .pipe(
      switchMap(
        (action: ShoppingListActions.TryGetIngredients) => {
          return this.http.get(this.apiUrl);
        }
      ),
      mergeMap(
        (response: any) => {
          return [
            {type: ShoppingListActions.GET_INGREDIENTS, payload: response.ingredients}
          ];
        }
      )
    );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
