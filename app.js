const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
// const upload = require('./middleware/upload');
// const multer = require('multer')
const fileUpload = require("express-fileupload")
const cors = require("cors")

const app = express();

app.use(fileUpload({
  createParentPath: true
}))

app.use(cors())
app.use(express.json())

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/category', require('./routes/products/category.routes'));

app.use('/api/subCategory', require('./routes/products/subCategory.routes'));

app.use('/api/products', require('./routes/products/product.routes'));

app.use('/api/subProducts', require('./routes/products/subProduct.routes'));

// app.use('/api/image', upload.single('imageSrc'), require('./routes/image.routes'));
// app.use('/api/image', require('./routes/image.routes'));
// app.use('/api/image', function (req, res) {
//     upload(req, res, function (err) {
//       if (err instanceof multer.MulterError) {
//         //   <h1>Случилась ошибка Multer при загрузке</h1>
//           console.log('Случилась ошибка Multer при загрузке')
//         // Случилась ошибка Multer при загрузке.
//       } else {
//         //   <h1>При загрузке произошла неизвестная ошибка</h1>
//           console.log('При загрузке произошла неизвестная ошибка', err)
//         // При загрузке произошла неизвестная ошибка.
//       }
//     //   <h1>Все прекрасно загрузилось</h1>
//       console.log('Все прекрасно загрузилось')
//       // Все прекрасно загрузилось.
//     })
//   });

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
