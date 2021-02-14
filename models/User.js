const {Schema, model, Types} = require('mongoose');

// Это регистрация нового пользователя, в дальнешем это мне будет не нужно
const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{ type: Types.ObjectId, ref: 'Link' }]
});
// вот по эту строчку

module.exports = model('User', schema);
// или даже по эту строчку