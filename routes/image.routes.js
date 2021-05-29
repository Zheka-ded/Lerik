const {Router} = require('express');
const Image = require('../models/Image');
const router = Router();

router.post('/saveImage', async (req, res) => {
    try {

      if(!req.files || !req.body.parent){
        res.send({
          status: false,
          message: "No files or data to save"
        })
      } else {
        const { imageSrc } = req.files
        const { parent } = req.body

        if (imageSrc.mimetype === 'image/png' || imageSrc.mimetype === 'image/jpeg' || imageSrc.mimetype === 'image/jpg') {

          const date = new Date().toLocaleString('ua-UA').split('').filter(el => !isNaN(el) && el !== ' ').join('')
    
          imageSrc.mv(`./uploads/${imageSrc.name}/${date}-${Date.now()}-${imageSrc.name}`)

          const newImage = new Image({
            parent: parent,
            path: `./uploads/${imageSrc.name}`,
            imageSrc: `${date}-${Date.now()}-${imageSrc.name}`,
            name: imageSrc.name
          });

          await newImage.save()
      
          res.send({
            status: true,
            message: "File is uploaded",
            file: imageSrc
          })

        } else {
          res.send({
            status: false,
            message: "This is not a picture",
            name: imageSrc.name
          })
        }
      }
    } catch (e) {
      res.status(500).send(e)
    }
})

module.exports = router;