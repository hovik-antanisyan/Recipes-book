import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';

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
              private store: Store<fromApp.AppState>,
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
              this.snackBar.open(
                error,
                'Ok',
                {
                  panelClass: 'error'
                }
              );
            });
      }
    );
  }

  addToSL() {
    this.store.dispatch(new shoppingListActions.AddIngredients(this.recipe.ingredients));
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
              panelClass: 'error'
            }
          );
          console.log(error);
        });
  }

}
