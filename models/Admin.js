// const {Schema, model, Types} = require('mongoose');
const {Schema, model} = require('mongoose');

// Это регистрация нового пользователя, в дальнешем это мне будет не нужно
const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    tel: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // links: [{ type: Types.ObjectId, ref: 'Link' }]
});
// вот по эту строчку

module.exports = model('Admin', schema, 'admins');
// или даже по эту строчку