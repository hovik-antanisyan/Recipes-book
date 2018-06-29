import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  startEditing = new Subject<number>();

  apiUrl = 'http://localhost:3000/';

  ingredientsChanged = new Subject<Ingredient[]>();

  constructor(private http: HttpClient) {
  }

  onGetIngredients() {
    return this.http.get(`${this.apiUrl}ingredients`)
      .pipe(map((response: any) => {
        return response.ingredients;
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        return throwError(error.message);
      }));
  }

  onGetIngredient(id) {
    return this.http.get(`${this.apiUrl}ingredients/${id}`)
      .pipe(map((response: any) => {
        return response.ingredient;
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));
  }

  addIngredient(ingredient: Ingredient) {
    // this.ingredients.push(ingredient);
    // this.ingredientsChanged.next(this.ingredients.slice());
  }

  editIngredient(id, ingredient: Ingredient) {
    // this.ingredients[id] = ingredient;
    // this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // this.ingredients.push(...ingredients);
    // this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(id: number) {
    // this.ingredients.splice(id, 1);
    // this.ingredientsChanged.next(this.ingredients.slice());
  }
}
