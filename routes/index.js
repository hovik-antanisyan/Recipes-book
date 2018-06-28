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

module.exports = router;
