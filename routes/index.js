const RecipeController = require("../api/controllers/recipe-controller");
const IngredientController = require('../api/controllers/ingredient-controller');

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/recipes', RecipeController.index);

router.post('/recipes', RecipeController.create);

router.get('/recipes/:id', RecipeController.getRecipe);

router.post('/recipes/except', RecipeController.getRecipeExcept);

router.put('/recipes/:id/edit', RecipeController.updateRecipe);

router.delete('/recipes/:id', RecipeController.deleteRecipe);


router.get('/ingredients', IngredientController.index);

router.get('/ingredients/:id', IngredientController.getIngredient);

router.delete('/ingredients/:id', IngredientController.deleteIngredient);

router.put('/ingredients/:id/edit', IngredientController.updateIngredient);

router.post('/ingredients', IngredientController.addIngredient);

module.exports = router;
