const upload = async (req, res) => {
    try {
      if(!req.files){
        res.send({
          status: false,
          message: "No files"
        })
      } else {
        const {imageSrc} = req.files

        if (imageSrc.mimetype === 'image/png' || imageSrc.mimetype === 'image/jpeg' || imageSrc.mimetype === 'image/jpg') {

            const date = new Date().toLocaleString('ua-UA').split('').filter(el => !isNaN(el) && el !== ' ').join('')
    
            let r = imageSrc
    
            imageSrc.mv(`./uploads/${imageSrc.name}/` + `${date}-${Date.now()}-${imageSrc.name}`)
      
            res.send({
              status: true,
              message: "File is uploaded",
              file: r
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
}



module.exports = upload

