import {Recipe} from '../recipe.model';

export const TRY_SET_RECIPES = 'TRY_SET_RECIPES';
export const SET_RECIPES = 'SET_RECIPES';
export const TRY_ADD_RECIPE = 'TRY_ADD_RECIPE';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export class TrySetRecipes {
  readonly type = TRY_SET_RECIPES;
}

export class SetRecipes {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class AddRecipe {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class TryAddRecipe {
  readonly type = TRY_ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: {_id: string, recipe: Recipe}) {}
}

export class DeleteRecipe {
  readonly type = DELETE_RECIPE;

  constructor(public payload: string) {}
}

export type RecipeActions =
  TrySetRecipes |
  SetRecipes |
  AddRecipe |
  UpdateRecipe |
  DeleteRecipe;
