const {Schema, model, Types} = require('mongoose');

const subProductSchema = new Schema ({
    parent: {ref: 'Products', type: Types.ObjectId},
    date: {type: String},
    title: {type: String, required: true},
    cod: {type: String, required: true},
    price: {type: Number, required: true},
    sale: {type: Number, required: true},
    img: {type: [String], required: true},
    description: {type: [String], required: true},
})

module.exports = model('SubProducts', subProductSchema, 'subProduct')