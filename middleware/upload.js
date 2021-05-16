const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },

    filename(req, file, cb){
        const date = new Date().toLocaleString('ua-UA').split('').filter(el => !isNaN(el) && el !== ' ').join('')
        cb(null, `${date}-${file.originalname}`)
        cb(null, `${file.originalname}`)
    }
})


const fileFilter = (req, file, cd) => {
    console.log(file)
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cd(null, true)
    } else {
        cd(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 6,
    it: () => console.log('limits - 1')
}

limits.it()

// console.log(storage)

module.exports = multer({ storage, fileFilter, limits })