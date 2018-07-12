import {Recipe} from '../recipe.model';

export const TRY_SET_RECIPES = 'TRY_SET_RECIPES';
export const SET_RECIPES = 'SET_RECIPES';

export class TrySetRecipes {
  readonly type = TRY_SET_RECIPES;
}

export class SetRecipes {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export type RecipeActions =
  TrySetRecipes |
  SetRecipes;