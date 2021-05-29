const {Schema, model, Types} = require('mongoose');

const imageSchema = new Schema ({
    parent: {type: String, required: true},
    parent: {type: String,},
    path: {type: String,},
    name: {type: String,},
    imageSrc: {type: String},
})

module.exports = model('Images', imageSchema, 'image')
