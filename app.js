const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/category', require('./routes/products/category.routes'));

app.use('/api/subCategory', require('./routes/products/subCategory.routes'));

app.use('/api/products', require('./routes/products/product.routes'));

app.use('/api/subProducts', require('./routes/products/subProduct.routes'));

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
