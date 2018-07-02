import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ACTION_TYPES = {add: 1, update: 2, delete: 3};

  startEditing = new Subject<number>();

  apiUrl = 'http://localhost:3000/';

  ingredientsChanged = new Subject<{type: number, ingredient?: Ingredient, ingredients?: Ingredient[]}>();

  constructor(private http: HttpClient) {
  }

  onGetIngredients() {
    return this.http.get(`${this.apiUrl}ingredients`)
      .pipe(map((response: any) => {
        return response.ingredients;
      }))
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }

  onGetIngredient(id) {
    return this.http.get(`${this.apiUrl}ingredients/${id}`)
      .pipe(map((response: any) => {
        return response.ingredient;
      }))
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }

  onAddIngredient(ingredient: Ingredient) {
    return this.http.post(`${this.apiUrl}ingredients`, ingredient)
      .pipe(map((response: any) => {
        return response.ingredient;
      }))
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }

  onEditIngredient(id, ingredient: Ingredient) {
    return this.http.put(`${this.apiUrl}ingredients/${id}/edit`, ingredient)
      .pipe(map((response: any) => {
        return response.ingredient;
      }))
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }

  onAddIngredients(ingredients: Ingredient[]) {
    return this.http.post(`${this.apiUrl}ingredients/`, ingredients)
      .pipe(map((response: any) => {
        return response.ingredients;
      }))
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }

  onDeleteIngredient(id: number) {
    return this.http.delete(`${this.apiUrl}ingredients/${id}`)
      .pipe(map((response: any) => {
        return response.ingredient;
      }))
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }
}
