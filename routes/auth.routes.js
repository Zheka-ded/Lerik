const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const Admin = require('../models/Admin');
const router = Router();

//  /api/auth/register (мне это не нужно)
router.post(
    '/register',
    [
        check('name', 'Введите имя').exists(),
        check('email', 'Некоректный email').isEmail(),
        check('tel', 'Введите номер телехвона').isLength({min:12, max:12}),
        check('password', 'Минимальная длинна пароля 9 символов').isLength({ min: 9 })
    ],
    async (req, res) => {
    try {
        // console.log('body:', req.body)
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректные данные при регистрации'
            })
        }

        const {name, email, tel, password} = req.body;

        const candidateEmail = await Admin.findOne({ email });

        if (candidateEmail) {
            return res.status(400).json({ message: 'Такой пользователь уже существует' });
        };

        const candidateTel = await Admin.findOne({ tel });

        if (candidateTel) {
            return res.status(400).json({ message: 'Такой пользователь уже существует' });
        };

        const hashedPassword = await bcrypt.hash(password, 12);
        const admin = new Admin({ name, email, tel, password: hashedPassword });

        await admin.save();

        res.status(201).json({ message: 'Пользователь создан' });

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});
//  вот по эту строчку

//  /api/auth/login (авторизация админа)
router.post(
    '/login',
    [
        check('name', 'Введите имя').exists(),
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('tel', 'Введите номер телехвона').isLength({min:12, max:12}),
        check('password', 'Введите пароль').isLength({min:9}),
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректные данные при входе'
            })
        }

        const { name, email, tel, password} = req.body;

        const isMatchName = await Admin.findOne(({ name }));

        if(!isMatchName) {
            return res.status(400).json({ message: 'Имя не правильно'});
        }

        const admin = await Admin.findOne({ email });

        if(!admin) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }
        const adminTel = await Admin.findOne({ tel });

        if(!adminTel) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }

        const isMatchPass = await bcrypt.compare(password, admin.password);

        if(!isMatchPass) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        const token = jwt.sign(
            {AdminId: admin.id},
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({ token, adminId: admin.id });

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});

module.exports = router;