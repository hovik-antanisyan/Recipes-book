import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';

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
              private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = null != params.id;
        if (this.editMode) {
          this.recipeSv.onGetRecipe(this.id)
            .subscribe(
              (recipe: Recipe) => {
                this.recipe = recipe;

                this.isLoading = false;
                this.initEditForm();
              },
              (error: any) => {
                this.snackBar.open(
                  error,
                  'Ok',
                  {
                    panelClass: 'error'
                  }
                );
              });
        }
      }
    );

    if (!this.editMode) {
      this.isLoading = false;
      this.initCreateForm();
    }
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

  deleteIngredient(e, id) {
    e.target.closest('.ingredients_array').remove();
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
      this.recipeSv.onEditRecipe(this.id, this.recipeForm.value)
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
          });
    } else {
      this.recipeSv.onAddRecipe(this.recipeForm.value)
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
          });
    }
  }

}
