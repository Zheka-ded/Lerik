const {Schema, model} = require('mongoose');

const schema = new Schema({
    product: {type: String, required: true},
    category: {type: String, required: true},
    subcategory: {type: String, required: false},
    title: {type: String, required: true},
    cod: {type: String, required: true},
    price: {type: Number, required: true},
    sale: {type: Number, required: true},
    img: {type: [String], required: true},
    description: {type: [String], required: true},
});

module.exports = model('Product', schema, 'goods');