import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class RecipeService {
  private apiUrl = 'http://localhost:3000/';

  private recipes: Recipe [] = [];

  recipesChanged = new Subject<boolean>();

  constructor(private slService: ShoppingListService, private http: HttpClient) {
  }

  onGetRecipes() {
    return this.http.get(`${this.apiUrl}recipes`)
      .pipe(map((response: any) => {
        return response.recipes;
      }))
      .pipe(catchError((errorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }

  onGetRecipe(id: string) {
    return this.http.get(`${this.apiUrl}recipes/${id}`)
      .pipe(map((response: any) => {
        return response.recipe;
      }))
      .pipe(catchError((errorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }

  onGetRecipeExcept(name: string, id: string, editMode: boolean) {
    return this.http.post(`${this.apiUrl}recipes/except`, {id: editMode ? id : null, name})
      .pipe(map((response: any) => {
        return response.exists ? {'notUniqueControl': name} : null;
      }))
      .pipe(catchError((errorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  onEditRecipe(id: string, recipe: Recipe) {
    return this.http.put(`${this.apiUrl}recipes/${id}/edit`, recipe)
      .pipe(map((response: any) => {
        this.recipesChanged.next(true);
        return response;
      }))
      .pipe(catchError((errorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }

  onAddRecipe(recipe: Recipe) {
    return this.http.post(`${this.apiUrl}recipes`, recipe)
      .pipe(map((response: any) => {
        this.recipesChanged.next(true);
        return response;
      }))
      .pipe(catchError((errorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }

  onDeleteRecipe(id: string) {
    return this.http.delete(`${this.apiUrl}recipes/${id}`)
      .pipe(map((response: any) => {
        this.recipesChanged.next(true);
        return response.recipe;
      }))
      .pipe(catchError((errorResponse) => {
        return throwError(errorResponse.error.message);
      }));
  }
}