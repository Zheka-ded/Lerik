const {Schema, model, Types} = require('mongoose');

const productSchema = new Schema ({
    parent: {ref: 'SubCategories', type: Types.ObjectId},
    child: [{ref: 'SubProducts', type: Types.ObjectId}],
    title: {type: String, required: true}, // Нужно сделать уникальным?
    date: {type: String},
    cod: {type: String, required: true}, // Нужно сделать уникальным?
    price: {type: Number, required: true},
    sale: {type: Number, required: true},
    imageSrc: {type: [String], required: true},
    description: {type: [String], required: true},
})

module.exports = model('Products', productSchema, 'product')