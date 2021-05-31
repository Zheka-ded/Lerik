const {Schema, model, Types} = require('mongoose');

const subCategorySchema = new Schema ({
    parent: {ref: 'Categories', type: Types.ObjectId},
    childSubCategory: [{ref: 'SubCategories', type: Types.ObjectId}],
    checkSubCategory: {type: Boolean,},
    child: [{ ref: 'Products', type: Types.ObjectId }],
    title: {type: String, required: true, unique: true},
})

module.exports = model('SubCategories', subCategorySchema, 'subCategory')
