const {Schema, model, Types} = require('mongoose');

const productSchema = new Schema ({
    category: {ref: 'SubCategories', type: Types.ObjectId},
    title: {type: String, required: true}, // Нужно сделать уникальным?
    date: {type: String},
    cod: {type: Number, required: true}, // Нужно сделать уникальным?
    price: {type: Number, required: true},
    sale: {type: Number, required: true},
    imageSrc: [{ref: 'Image', type: String}],
    description: {type: [String], required: true},
})

module.exports = model('Products', productSchema, 'product')