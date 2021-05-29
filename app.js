const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload")
const cors = require("cors")

const app = express();

app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 512 * 512 * 5 },
//   uriDecodeFileNames: true
}))

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('./uploads'))

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/category', require('./routes/products/category.routes'));

app.use('/api/subCategory', require('./routes/products/subCategory.routes'));

app.use('/api/products', require('./routes/products/product.routes'));

app.use('/api/subProducts', require('./routes/products/subProduct.routes'));

app.use('/api/image', require('./routes/image.routes'));


const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start()

/**
 * EXAMPLE TO CONFIG DEFAULT
 * 
 *  "mongoUri": "mongodb://localhost:27017/leriktest2"
 */
