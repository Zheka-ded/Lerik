const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },

    filename(req, file, cb){
        const date = new Date().toLocaleString('ua-UA').split('').filter(el => !isNaN(el) && el !== ' ').join('')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cd) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cd(null, true)
    } else {
        cd(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({ storage, fileFilter, limits})