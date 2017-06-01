import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Banjo Shark',
            'This is my recipe of banjo shark.',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Banjo_Shark_recipe.jpg/1280px-Banjo_Shark_recipe.jpg',
            [new Ingredient('meat', 1), new Ingredient('French Fries', 3)]),
        new Recipe(
            'Mushroom pesto burgers',
            'If your kids are burger-crazy, then these vegetarian mushroom pesto burgers need to be at the top of your meal-planning list!',
            'http://static.kidspot.com.au/recipe_asset/1527/5448.jpg-20150309014003~q75,dx720y432u1r1gg,c--.jpg',
            [new Ingredient('Buns', 1), new Ingredient('Meat', 3)]),
    ];

    constructor(private shoppingListService: ShoppingListService) {
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredient(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index].name = recipe.name;
        this.recipes[index].description = recipe.description;
        this.recipes[index].imagePath = recipe.imagePath;
        this.recipes[index].ingredients = recipe.ingredients;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}

