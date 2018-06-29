import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') nameAmountRef: ElementRef;
  ingredient: Ingredient;

  index: number;

  editMode = false;

  slForm: FormGroup;

  editSubscription: Subscription;

  constructor(private slService: ShoppingListService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.editSubscription = this.slService.startEditing.subscribe((id: number) => {
      this.index = id;
      this.editMode = true;
      this.slService.onGetIngredient(id)
        .subscribe(
          (ingredient: Ingredient) => {
            this.ingredient = ingredient;
            delete this.ingredient._id;
            this.slForm.setValue(this.ingredient);
          });
    });


    // this.slService.getIngredients();
    this.slForm = this.fb.group({
      name: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]]
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
      this.slService.editIngredient(this.index, this.slForm.value);
      this.editMode = false;
    } else {
      this.slService.addIngredient(this.slForm.value);
    }
    this.slForm.markAsUntouched();
    this.slForm.markAsPristine();
    this.name = null;
    this.amount = null;
  }

  deleteIngredient() {
    this.editMode = false;
    this.slForm.reset();
    this.slService.deleteIngredient(this.index);
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
