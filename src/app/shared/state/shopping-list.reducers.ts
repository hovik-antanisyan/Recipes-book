import * as ShoppingListActions from './shopping-list.actions';
import {Ingredient} from '../ingredient.model';
import {DeleteIngredient} from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Pineapple', 1),
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      state.ingredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: state.ingredients
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      state.ingredients.splice(action.payload, 1);
      return {
        ...state,
        ingredients: [...state.ingredients]
      };
    default:
      return state;
  }
}
