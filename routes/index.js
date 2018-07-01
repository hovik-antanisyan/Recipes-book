const RecipeController = require("../api/controllers/recipe-controller");
const IngredientController = require('../api/controllers/ingredient-controller');
const UserController = require('../api/controllers/user-controller');
const AuthCheck = require('../api/middlweares/auth-check');

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/recipes', RecipeController.index);

router.post('/recipes', AuthCheck, RecipeController.create);

router.get('/recipes/:id', RecipeController.getRecipe);

router.post('/recipes/except', AuthCheck, RecipeController.getRecipeExcept);

router.put('/recipes/:id/edit', AuthCheck, RecipeController.updateRecipe);

router.delete('/recipes/:id', AuthCheck, RecipeController.deleteRecipe);


router.get('/ingredients', IngredientController.index);

router.get('/ingredients/:id', IngredientController.getIngredient);

router.delete('/ingredients/:id', AuthCheck, IngredientController.deleteIngredient);

router.put('/ingredients/:id/edit', AuthCheck, IngredientController.updateIngredient);

router.post('/ingredients', AuthCheck, IngredientController.addIngredient);


router.post('/user/signup', UserController.signup);

router.post('/user/signin', UserController.signin);

router.post('/user/except', AuthCheck, UserController.getUserExcept);

module.exports = router;
