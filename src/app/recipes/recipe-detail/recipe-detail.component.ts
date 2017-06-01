import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    recipeIndex: number;
    constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.recipeIndex = +params['id'];
                this.recipe = this.recipeService.getRecipe(this.recipeIndex);
            }
        );
    }

    addToShoppingList(recipe: Recipe) {
        this.recipeService.addIngredient(recipe.ingredients);
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.recipeIndex);
        this.router.navigate(['../']);
    }

}
