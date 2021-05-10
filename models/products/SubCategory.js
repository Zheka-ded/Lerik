const {Schema, model, Types} = require('mongoose');

const subCategorySchema = new Schema ({
    parent: {ref: 'Categories', type: Types.ObjectId},
    title: {type: String, required: true, unique: true},
    child: [{ ref: 'Products', type: Types.ObjectId }]
})

module.exports = model('SubCategories', subCategorySchema, 'subCategory')
