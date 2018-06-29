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
    }
};