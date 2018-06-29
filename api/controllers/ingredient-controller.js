const Ingredient = require('../models/ingredient.model');

module.exports = {
    async index(req, res, next) {
        try {
            const ingredients = await Ingredient
                .find({})
                .select({__v: false})
                .lean();

            if (!ingredients) {
                return res.status(404).json({message: 'No ingredient found.'});
            }

            return res.json({ingredients});
        } catch (e) {
            return next(e);
        }
    },

    async addIngredient(req, res, next) {
        try {
            let props, ingredient, newIngredient, ingredients = [];

            if (Array.isArray(req.body)) {
                for (const item of req.body) {
                    props = item;
                    delete props._id;
                    ingredient = new Ingredient(props);
                    newIngredient = await ingredient.save();
                    ingredients.push(newIngredient);
                }
                return res.status(201).json({success: true, ingredients});
            } else {
                props = req.body;
                ingredient = new Ingredient(props);
                newIngredient = await ingredient.save();
                return res.status(201).json({success: true, ingredient: newIngredient});
            }
        } catch (e) {
            next(e);
        }
    },

    async getIngredient(req, res, next) {
        try {
            const ingredient = await Ingredient
                .findOne({_id: req.params.id})
                .select({__v: false})
                .lean();

            if (!ingredient) {
                return res.status(404).json({message: 'Document not found.'});
            }

            return res.json({success: true, ingredient});
        } catch (e) {
            next(e);
        }
    },

    async deleteIngredient(req, res, next) {
        try {
            const ingredient = await Ingredient.findByIdAndRemove(req.params.id);

            if (!ingredient) {
                return res.status(404).json({message: 'Document not found.', success: false});
            }

            return res.status(202).json({success: true, ingredient});
        } catch (e) {
            next(e);
        }
    },

    async updateIngredient(req, res, next) {
        try {
            const props = req.body;

            const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, props, {new: true, rawResult: false});
            console.log(ingredient);
            if (!ingredient) {
                return res.status(404).json({message: 'Document not found.', success: false});
            }

            return res.status(202).json({success: true, ingredient});
        } catch (e) {
            next(e);
        }
    }
};