const {Router} = require('express');
const Product = require('../../models/products/Product');
const SubProduct = require('../../models/products/SubProduct');
const {check, validationResult} = require('express-validator');
const router = Router();

router.post(
    '/createSubProduct',
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
    
            const subProductName = await SubProduct.findOne({ title, parent });
    
            if (subProductName) {
                return res.status(400).json({ message: 'Такой товар в это категории уже существует' });
            };

            const newSubProduct = new SubProduct({ parent, title, cod, price, sale, img, description, date });

            
            await Product.update({_id: parent},{ $push: {
                child: await newSubProduct.save()
            }})

            
    
            res.status(201).json({ message: 'Товар создан' });
    
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'});
        }
    }
)

router.get('/loading', async (req, res) => {
    try {
        const subProducts = await SubProduct.find();
        res.json(subProducts);
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