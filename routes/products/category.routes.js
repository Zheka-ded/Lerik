const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const Category = require('../../models/products/Category');
const router = Router();

router.post(
    '/createCategory',
    [
        check('title', 'Основная категория').exists()
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
    
            const { title } = req.body;
    
            const categoryName = await Category.findOne({ title });
    
            if (categoryName) {
                return res.status(400).json({ message: 'Такая категория уже существует' });
            };

            const newCategory = new Category({ title });
            
            await newCategory.save();
    
            res.status(201).json({ message: 'Основная категория создана' });
    
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'});
        }
    }
)

// // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

router.get('/loading', async (req, res) => {
    try {
        const category = await Category.find();
        res.json(category);
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