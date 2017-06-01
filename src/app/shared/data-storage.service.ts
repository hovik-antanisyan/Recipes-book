import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from 'app/recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipe() {
        // Firebase Authentication doesn't wotk
        /*const token = this.authService.getIdToken();

        return this.http.put('https://ng-recipes-book.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());*/

        return this.http.put('https://ng-recipes-book.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecipe() {
        this.http.get('https://ng-recipes-book.firebaseio.com/recipes.json')
            .map(
                (data: Response) => {
                    const recipes = data.json();
                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            console.log(recipe);
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }

}
