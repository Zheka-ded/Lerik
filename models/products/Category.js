const {Schema, model, Types} = require('mongoose');

const categorySchema = new Schema ({
    title: {type: String, required: true, unique: true},
    child: [{ ref: 'SubCategories', type: Types.ObjectId }],
})

module.exports = model('Categories', categorySchema, 'category')
