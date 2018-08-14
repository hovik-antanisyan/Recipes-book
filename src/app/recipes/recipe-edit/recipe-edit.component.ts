import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';

import {Observable} from 'rxjs';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  recipe: Recipe;
  id: string;
  editMode = false;
  isLoading = true;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private recipeSv: RecipeService,
              private router: Router,
              private snackBar: MatSnackBar,
              private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = null != params.id;
        this.store.select('recipes')
          .subscribe((state: fromRecipe.State) => {
              this.recipe = state.recipes.find((item) => item._id === this.id);
              this.isLoading = state.loading;
              if (state.loaded) {
                if (this.editMode) {
                  this.initEditForm();
                } else if (!this.editMode) {
                  this.initCreateForm();
                }
              }
            }
          );
      }
    );


  }

  initCreateForm() {
    this.recipeForm = this.fb.group({
      name: [, [Validators.required], [this.uniqueValidator.bind(this, 'name')]],
      description: [, Validators.required],
      imagePath: [, Validators.required],
    });

    this.recipeForm.setControl('ingredients', this.fb.array([]));
  }

  initEditForm() {
    this.recipeForm = this.fb.group({
      name: [this.recipe.name, [Validators.required], [this.uniqueValidator.bind(this, 'name')]],
      description: [this.recipe.description, Validators.required],
      imagePath: [this.recipe.imagePath, Validators.required],
    });

    const ingredients = this.recipe.ingredients.map((item) => {
      return this.fb.group({
        name: [item.name, [Validators.required]],
        amount: [item.amount, [Validators.required, Validators.min(1)]]
      });
    });

    this.recipeForm.setControl('ingredients', this.fb.array(ingredients));
  }

  uniqueValidator(controlName: string, control: FormControl): Observable<{ [key: string]: any }> | Observable<null> {
    return this.recipeSv.onGetRecipeExcept(control.value, this.id, this.editMode);
  }

  deleteIngredient(id) {
    this.ingredients.removeAt(id);
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.fb.group({
        name: ['', [Validators.required]],
        amount: ['', [Validators.required, Validators.min(1)]],
      }));

    setTimeout(() => {
      Array.from(document.querySelectorAll('.recipe_form input.ing_name, .recipe_form input.ing_amount'))
        .map((item: HTMLInputElement) => {
          item.focus();
        });
    }, 0);
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({recipe: {...this.recipeForm.value, _id: this.id}, _id: this.id}));
    } else {
      this.store.dispatch(new RecipeActions.TryAddRecipe({...this.recipeForm.value}));
      /*this.recipeSv.onAddRecipe(this.recipeForm.value)
        .subscribe(
          (response: any) => {
            this.router.navigateByUrl('/recipes');
          },
          (error: any) => {
            this.snackBar.open(
              error,
              'Ok',
              {
                panelClass: 'error'
              }
            );
          });*/
    }
  }

}
