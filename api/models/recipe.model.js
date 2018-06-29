const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameUnique = async function () {
    const query = {name: this.name};
    if (!this.isNew) {
        this._id = {$ne: this._id};
    }

    const recipe = await this.model('Recipe')
        .findOne(query);
    if (recipe) {
        return Promise.resolve(false);
    } else {
        return Promise.resolve(true);
    }
};

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: nameUnique,
            message: 'Name must be unique.'
        }
    },
    description: {type: String, required: true},
    imagePath: {type: String, required: true},
    ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
});


module.exports = mongoose.model('Recipe', recipeSchema);
