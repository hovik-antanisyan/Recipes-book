import * as ShoppingListActions from './shopping-list.actions';
import {Ingredient} from '../../shared/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIndex: number;
}

const initialState = {
  ingredients: [],
  editedIngredient: null,
  editedIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload
      };
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
        editedIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
        editedIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient,
      };
      state.ingredients[state.editedIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: state.ingredients,
        editedIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      state.ingredients.splice(state.editedIndex, 1);
      return {
        ...state,
        ingredients: [...state.ingredients],
        editedIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient,
        editedIndex: action.payload
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIndex: -1,
        editedIngredient: null
      };
    default:
      return state;
  }
}
