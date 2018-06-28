import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];

  ingChangedSubscription: Subscription;

  constructor(private slService: ShoppingListService, private router: Router) {
  }

  ngOnInit() {
    this.slService.onGetIngredients()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });

    this.ingChangedSubscription = this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.slService.onGetIngredients()
        .subscribe((ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        });
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
