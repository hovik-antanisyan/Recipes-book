const Recipe = require('../models/recipe.model');
const Ingredient = require('../models/ingredient.model');

module.exports = {
    async index(req, res, next) {
        try {
            let recipes = await Recipe
                .find({}, {__v: false})
                .populate('ingredients')
                .lean();


            if (!recipes.length) {
                return res.status(404).json({success: false, message: 'No recipe found.'});
            }


            for (let recipe of recipes) {
                for (let ingredient of recipe.ingredients) {
                    delete ingredient.__v;
                }
            }

            return res.json({success: true, recipes});
        } catch (e) {
            return res.status(500).json({success: false, error: e});
        }

    },

    async create(req, res, next) {
        const ingredients = [];

        try {
            if (req.body.ingredients) {
                for (let ingredient of req.body.ingredients) {
                    let newIngredient = new Ingredient(ingredient);
                    newIngredient = await newIngredient.save();
                    ingredients.push(newIngredient);
                }
            }

            const recipe = new Recipe({
                name: req.body.name,
                description: req.body.description,
                imagePath: req.body.imagePath,
                ingredients: ingredients
            });

            const newRecipe = await recipe.save();

            return res.json({success: true, recipe: newRecipe});
        } catch (e) {
            if (e.name === 'ValidationError') {
                const errors = {};
                for (const key in e.errors) {
                    if (e.errors.hasOwnProperty(key)) {
                        errors[key] = e.errors[key].message;
                    }
                }
                return res.status(400).json({errors: errors, message: 'Validation failed.'});
            }

            next(e);
        }
    },

    async getRecipe(req, res, next) {
        try {
            const recipe = await
                Recipe
                    .findById(req.params.id)
                    .select({__v: false})
                    .populate('ingredients');

            if (!recipe) {
                return next(new Error('Document not found.'));
            }

            return res.json({success: true, recipe});
        } catch (e) {
            return res.status(500).json({success: false, message: e});
        }
    }
    ,

    async getRecipeExcept(req, res, next) {
        try {
            const recipes = await
                Recipe
                    .find({name: req.body.name.trim(), _id: {$ne: req.body.id}});

            if (!recipes) {
                return next(new Error('Document not found.'));
            }

            return res.json({success: true, exists: recipes.length > 0});
        } catch (e) {
            return res.status(500).json({success: false, error: e.message});
        }
    }
    ,

    async updateRecipe(req, res, next) {
        const ingredients = [];

        try {
            if (req.body.ingredients) {
                for (let ingredient of req.body.ingredients) {
                    let newIngredient = new Ingredient(ingredient);
                    newIngredient = await
                        newIngredient.save();
                    ingredients.push(newIngredient);
                }
            }

            let props = req.body;
            delete props.ingredients;
            props = Object.assign(props, {ingredients});
            const recipe = await
                Recipe.findByIdAndUpdate(req.params.id, props, {new: true, rawResult: false});

            if (!recipe) {
                return next(new Error('Document not found.'));
            }

            return res.json({success: true, recipe});
        } catch (e) {
            return res.status(500).json({success: false, error: e.message});
        }
    }
    ,

    async deleteRecipe(req, res, next) {
        try {
            const recipe = await
                Recipe.findByIdAndDelete(req.params.id);

            if (!recipe) {
                return res.json(404, {message: 'Document not found'});
            }

            return res.json({success: true, recipe});
        } catch (e) {
            return next(e);
        }
    }
}
;