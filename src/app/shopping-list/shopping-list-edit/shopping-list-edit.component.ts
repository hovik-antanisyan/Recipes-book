import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  editMode = false;
  slForm: FormGroup;

  constructor(private snackBar: MatSnackBar,
              private store: Store<fromApp.AppState>,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.slForm = this.fb.group({
      name: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]]
    });

    this.store.select('shoppingList')
      .subscribe((result: fromShoppingList.State) => {
        if (result.editedIndex !== -1) {
          delete result.editedIngredient._id;
          delete result.editedIngredient['__v'];
          this.editMode = true;
          this.slForm.setValue(result.editedIngredient);
        } else {
          this.editMode = false;
        }
      });
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
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: this.slForm.value}));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(this.slForm.value));
    }
    this.slForm.markAsUntouched();
    this.slForm.markAsPristine();
    this.slForm.reset();
  }

  deleteIngredient() {
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.slForm.reset();
    this.slForm.markAsUntouched();
    this.slForm.markAsPristine();
  }

  resetForm() {
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
