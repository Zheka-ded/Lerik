const {Schema, model, Types} = require('mongoose');

const imageSchema = new Schema ({
    parent: {ref: 'Products', type: Types.ObjectId},
    name: {type: String,},
    imageSrc: {type: String},
})

module.exports = model('Images', imageSchema, 'image')
