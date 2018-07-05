import {Action, ActionReducer} from '@ngrx/store';
import * as ShoppingListActions from './shopping-list.actions';
import {Observable} from 'rxjs';
import {Ingredient} from '../ingredient.model';

const initialState = {
  ingredients: []
};

export function shoppinListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      console.log(action.payload);
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default:
      return state;
  }
}
