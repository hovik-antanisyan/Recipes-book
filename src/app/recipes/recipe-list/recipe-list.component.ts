import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipesState: Observable<fromRecipe.State>;

  constructor(private recipeService: RecipeService, private store: Store<fromRecipe.FeatureState>) {}

  ngOnInit() {
    this.store.dispatch(new RecipeActions.TrySetRecipes());
    this.recipesState = this.store.select('recipes');
  }

}
