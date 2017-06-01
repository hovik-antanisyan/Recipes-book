import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f') shoppingForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private shoppingListService: ShoppingListService) {
    }

    ngOnInit() {
        this.subscription = this.shoppingListService.startEditing.subscribe(
            (index: number) => {
                this.editMode = true;
                this.editedItemIndex = index;
                this.editedItem = this.shoppingListService.getIngredient(index);
                this.shoppingForm.form.setValue({
                    'name': this.editedItem.name,
                    'amount': this.editedItem.amount
                });
            }
        );
    }

    onSubmit(form: NgForm) {
        const ingName = form.value.name;
        const ingAmount = form.value.amount;
        if (!this.editMode) {
            this.shoppingListService.addIngredient(new Ingredient(ingName, ingAmount));
        } else {
            this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(ingName, ingAmount));
        }
        this.editMode = false;
        this.shoppingForm.reset();
    }

    onClearForm() {
        this.shoppingForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.onClearForm();
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
