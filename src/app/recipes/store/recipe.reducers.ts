import {Recipe} from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import {AppState} from '../../store/app.reducers';

export interface FeatureState extends AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
  loading: boolean;
  loaded: Boolean;
}

const initialState: State = {
  recipes: [],
  loading: true,
  loaded: false
};

export function recipeReducers(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
        loaded: true
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const updatedIndex = state.recipes.findIndex((item) => item._id === action.payload._id);
      const updatedRecipe = {...state.recipes[updatedIndex], ...action.payload.recipe};
      state.recipes[updatedIndex] = updatedRecipe;
      return {
        ...state,
        recipes: state.recipes
      };
    case RecipeActions.DELETE_RECIPE:
      const deletedIndex = state.recipes.findIndex((item) => item._id === action.payload);
      state.recipes.splice(deletedIndex, 1);
      return {
        ...state,
        recipes: state.recipes
      };
    default:
      return state;
  }
}