import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id: string;
  recipe: Recipe;

  constructor(private recipeService: RecipeService,
              public snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.recipeService.onGetRecipe(this.id)
          .subscribe(
            (recipe: Recipe) => {
              this.recipe = recipe;
            },
            (error: any) => {
              console.log(error);
            });
      }
    );
  }

  addToSL() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.snackBar.open(
      'Ingredients have been added to the Shopping list!',
      'Ok',
      {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      }
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteRecipe() {
    this.recipeService.onDeleteRecipe(this.id)
      .subscribe(
        (recipe: Recipe) => {
            this.router.navigate(['/recipes']);
        },
        (error: any) => {
          this.snackBar.open(
            error,
            'Ok',
            {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            }
          );
          console.log(error);
        });
  }

}
