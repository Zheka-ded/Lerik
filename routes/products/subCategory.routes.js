const {Router} = require('express');
const SubCategory = require('../../models/products/SubCategory');
const Category = require('../../models/products/Category');
const {check, validationResult} = require('express-validator');
const router = Router();



router.post(
    '/createSubCategory',
    [
        check('parent', 'Родительская категория').exists(),
        check('title', 'Подкатегория').exists(),
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
    
            const { title, parent } = req.body;
    
            const subCategoryName = await SubCategory.findOne({ title });

            if (subCategoryName) {
                return res.status(400).json({ message: 'Такая подкатегория существует' });
            };
    
            const newSubCategoryName = new SubCategory({ title, parent });

            
            await Category.update({_id: parent},{ $push: {
                child: await newSubCategoryName.save()
            }})
    
            res.status(201).json({ message: 'Подкатегория создана' });
    
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'});
        }
    }
)

router.get('/loading', async (req, res) => {
    try {
        const subCategory = await SubCategory.find();
        res.json(subCategory);
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