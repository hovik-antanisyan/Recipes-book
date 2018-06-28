const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    imagePath: {type: String, required: true},
    ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
});


/*recipeSchema.pre('validate', function (next) {
    const self = this;
    this.model('Recipe')
        .findOne({name: self.name, _id: {$ne: self._id}})
        .then(recipe => {
            console.log('11111111', recipe);
            if (recipe) {
                console.log('error');
                self.invalidate("name", "name must be unique");
                return next(new Error('name must be unique'));
            }
        })
        .catch(err => {
            next(err);
        });

    next();
});*/

module.exports = mongoose.model('Recipe', recipeSchema);

/*
recipeSchema.path('name').validate(function (value) {
    mongoose.model('Recipe').findOne({name: value}, function (err, recipe) {
        if (recipe) {
            console.log(777777777);
            return false;
        }
    });
}, 'This name is already registered');*/
