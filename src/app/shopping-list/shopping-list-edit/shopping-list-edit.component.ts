import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';

import {Subscription} from 'rxjs';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import * as ShoppingListActions from '../../shared/state/shopping-list.actions';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnChanges, OnDestroy {

  editMode = false;
  slForm: FormGroup;
  editSubscription: Subscription;
  @Input() index: number;
  @Input() ingredient: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private snackBar: MatSnackBar,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.slForm = this.fb.group({
      name: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.ingredient) {
      this.editMode = true;
      this.ingredient = changes['ingredient'].currentValue;
      delete this.ingredient._id;
      this.slForm.setValue(this.ingredient);
    }
  }

  get name() {
    return this.slForm.value.name;
  }

  get amount() {
    return this.slForm.value.amount;
  }

  set name(name) {
    this.slForm.patchValue({name});
  }

  set amount(amount) {
    this.slForm.patchValue({amount});
  }

  addOrUpdateIngredient(e) {
    e.preventDefault();
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.index, ingredient: this.slForm.value}));
      this.editMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(this.slForm.value));
      this.slForm.markAsUntouched();
      this.slForm.markAsPristine();
      this.name = null;
      this.amount = null;
    }
  }

  deleteIngredient() {
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.index));
    this.slForm.reset();
    this.slForm.markAsUntouched();
    this.slForm.markAsPristine();
  }

  resetForm() {
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }

}
