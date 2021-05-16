const {Schema, model, Types} = require('mongoose');

const imageSchema = new Schema ({
    // src: {type: String, required: true, unique: true},
    // src: {type: String, required: true},
    imageSrc: {type: String},
})

module.exports = model('Images', imageSchema, 'image')
