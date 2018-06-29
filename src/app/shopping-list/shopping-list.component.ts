import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];

  ingChangedSubscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit() {
    this.slService.onGetIngredients()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });

    this.detectChanges();
  }

  detectChanges() {
    this.ingChangedSubscription = this.slService.ingredientsChanged.subscribe(
      (result: { type: number, ingredient?: Ingredient, ingredients?: Ingredient[] }) => {
        let index;

        switch (result.type) {
          case this.slService.ACTION_TYPES.add:
            this.ingredients.splice(0, 0, result.ingredient);
            this.snackBar.open(
              'Ingredient added successfully.',
              'Ok'
            );
            break;
          case this.slService.ACTION_TYPES.delete:
            index = this.ingredients
              .findIndex((item) => {
                return item._id === result.ingredient._id;
              });
            this.ingredients.splice(index, 1);
            this.snackBar.open(
              'Ingredient deleted successfully.',
              'Ok'
            );
            break;
          case this.slService.ACTION_TYPES.update:
            index = this.ingredients
              .findIndex((item) => {
                return item._id === result.ingredient._id;
              });
            this.ingredients[index] = result.ingredient;
            this.snackBar.open(
              'Ingredient updated successfully.',
              'Ok'
            );
            break;
        }
      });
  }

  onSelectIngredient(e, id) {
    e.preventDefault();
    this.slService.startEditing.next(id);
  }

  ngOnDestroy() {
    this.ingChangedSubscription.unsubscribe();
  }

}
