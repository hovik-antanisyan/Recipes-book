import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];

  subscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router) {

  }

  ngOnInit() {
    this.recipeService.onGetRecipes()
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        },
        error => {
          console.log(error);
        }
      );

    this.subscription = this.recipeService.recipesChanged.subscribe((changed) => {
      this.recipeService.onGetRecipes()
        .subscribe(
          (recipes: Recipe[]) => {
            this.recipes = recipes;
          },
          error => {
            console.log(error);
          }
        );
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
