const {Schema, model} = require('mongoose');

// Это регистрация нового пользователя, в дальнешем это мне будет не нужно
const adminSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    tel: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});
// вот по эту строчку

module.exports = model('Admin', adminSchema, 'admin');
// или даже по эту строчку