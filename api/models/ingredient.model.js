const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true, min: 1}
});

module.exports = mongoose.model('Ingredient', ingredientSchema);