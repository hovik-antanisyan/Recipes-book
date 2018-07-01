const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = async function (value) {
    try {
        const query = {email: value};
        if (!this.isNew) {
            query[$ne] = {_id: this._id};
        }

        const user = await mongoose.model('User').findOne(query);
        if (user) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    } catch (e) {
        return Promise.resolve(false);
    }
};

const emailValidator = function (value) {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return emailRegex.test(value);
};

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {validator: emailValidator, message: 'Field must be valid email.'},
            {validator: uniqueValidator, message: 'Field must be unique.'}
        ]
    },
    password: {type: String, required: true},
    name: {type: String, required: true},
    created_at: {type: Date},
    updated_at: {type: Date}
});

userSchema.pre('save', function () {
    this.updated_at = new Date().toString();
    if (this.isNew) {
        this.created_at = new Date().toString();
    }
});

module.exports = mongoose.model('User', userSchema);