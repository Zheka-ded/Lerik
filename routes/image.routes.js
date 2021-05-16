const {Router} = require('express');
const Image = require('../models/Image');
const upload = require('../middleware/uploadNew');
// const upload = require('../middleware/upload');
const router = Router();


router.post('/saveImage', upload, async (req, res) => {

        const newImage = new Image({
            imageSrc: req.file ? req.file.path : '911'
        });

        try {
            await newImage.save()

            res.status(201).json({ message: 'Image save' });
    
        } catch (e) {
            res.status(500).json({message: 'Image save error'});
        }
    }
)


module.exports = router;