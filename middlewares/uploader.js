const Multer = require('multer')

const logoPath = './files/template/logo/' 

const LogoStorage = Multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, logoPath) 
    },
    filename : (req, file, cb) => { 
        cb(null, `${Date.now() + '-' + file.originalname}`)   
    }
}) 

function LogoFilter(req, file, cb) {
    var mimetype = file.mimetype.split('/')[1] 

    if(mimetype === 'svg+xml'){ 
        cb(null, true)
    } else {
        req.fileErr = true
        cb(null, false)
    }
}

var uploadLogo = Multer({
    storage : LogoStorage,
    fileFilter : LogoFilter
})

module.exports = {
    uploadLogo
}