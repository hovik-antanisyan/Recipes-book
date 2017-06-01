import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    editMode = false;
    formRecipe: FormGroup;
    recipe: Recipe;
    recipeIndex: number;
    imagePath: string;
    ingredientControls: any;

    constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.recipeIndex = +this.route.snapshot.params['id'];
                this.editMode = params['id'] != null;
                if (this.editMode) {
                    this.recipe = this.recipeService.getRecipe(this.recipeIndex);
                    this.imagePath = this.recipe.imagePath;
                }
            }
        );
        this.initForm();
        this.ingredientControls = (<FormArray>this.formRecipe.get('ingredients')).controls;
    }

    initForm() {
        let recipeName = '';
        let recipeDesc = '';
        let recipeImagePath = '';
        let recipeIngredient = new FormArray([]);

        if (this.editMode) {
            recipeName = this.recipe.name;
            recipeDesc = this.recipe.description;
            recipeImagePath = this.recipe.imagePath;
            if (this.recipe.ingredients) {
                for (let ingredient of this.recipe.ingredients) {
                    recipeIngredient.push(new FormGroup({
                        'name': new FormControl(ingredient.name, Validators.required),
                        'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                    }));
                }
            }
        }
        this.formRecipe = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'description': new FormControl(recipeDesc, Validators.required),
            'image_path': new FormControl(recipeImagePath, Validators.required),
            'ingredients': recipeIngredient
        });
    }

    onSubmit() {
        const name = this.formRecipe.value.name;
        const description = this.formRecipe.value.description;
        const imagePath = this.formRecipe.value.image_path;
        const ingredients = (<FormArray>this.formRecipe.get('ingredients')).value;
        const newRecipe = new Recipe(name, description, imagePath, ingredients);
        if (this.editMode) {
            this.recipeService.updateRecipe(this.recipeIndex, newRecipe);
        } else {
            this.recipeService.addRecipe(newRecipe);
        }
        this.onCancel();
    }

    onAddIngredient() {
        (<FormArray>this.formRecipe.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
        );
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.formRecipe.get('ingredients')).removeAt(index);
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

}

