const {Router} = require('express');
const Product = require('../models/Product');
const {check, validationResult} = require('express-validator');
const router = Router();

// create product
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post(
    '/create',
    [
        check('product', 'Наименование').exists(),
        check('category', 'Категория').exists(),
        check('subcategory', 'Подкатегория').exists(),
        check('title', 'Название').exists(),
        check('cod', 'Код/Артикул').exists(),
        check('price', 'Цена').exists(),
        check('sale', 'Скидка').exists(),
        check('img', 'Ссылки картинкам').exists(),
        check('description', 'Описание').exists(),
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректные данные при регистрации'
            })
        }

        const { product, category, subcategory, title, cod, price, sale, img, description } = req.body;

        // const candidateEmail = await Admin.findOne({ email });

        // if (candidateEmail) {
        //     return res.status(400).json({ message: 'Такой пользователь уже существует' });
        // };

        // const candidateTel = await Admin.findOne({ tel });

        // if (candidateTel) {
        //     return res.status(400).json({ message: 'Такой пользователь уже существует' });
        // };

        // const hashedPassword = await bcrypt.hash(password, 12);
        const newProduct = new Product({ product, category, subcategory, title, cod, price, sale, img, description });

        await newProduct.save();

        res.status(201).json({ message: 'Product saved' });

    } catch (e) {
        res.status(500).json({message: 'hren` kakayato'});
    }
});
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

router.get('/loading', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

// router.get('/:id', async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         res.json(product);
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//     }
// })

module.exports = router;