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
    }
};