const {Router} = require('express');
const Product = require('../../models/products/Product');
const {check, validationResult} = require('express-validator');
const router = Router();

router.post(
    '/createProduct',
    [
        check('parent', 'Родительская категория').exists(),
        check('title', 'Название').exists(),
        check('date', 'DATE').exists(),
        check('cod', 'Код').exists(),
        check('price', 'Цена').exists(),
        check('sale', 'Скидка').exists(),
        check('img', 'Картинка').exists(),
        check('description', 'Описание').exists(),
    ],
    async (req, res) => {
        try {
            
            const errors = validationResult(req);
    
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные'
                })
            }
    
            const { parent, title, cod, price, sale, img, description, date } = req.body;
    
            const productName = await Product.findOne({ title, parent });
    
            if (productName) {
                return res.status(400).json({ message: 'Такой товар в это категории уже существует' });
            };

            const newProduct = new Product({ parent, title, cod, price, sale, img, description, date });

            await newProduct.save();
    
            res.status(201).json({ message: 'Товар создан' });
    
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'});
        }
    }
)

router.get('/loading', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

// // router.get('/:id', async (req, res) => {
// //     try {
// //         const product = await Product.findById(req.params.id);
// //         res.json(product);
// //     } catch (e) {
// //         res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
// //     }
// // })

module.exports = router;