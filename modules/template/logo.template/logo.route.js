const Router = require('express').Router()
const Controller = require('./logo.controller')
const LogoUploader = require('../../../middlewares/uploader') 

const fieldNameForLogo = 'svgFile' 

Router.route('/insert')
    .post(LogoUploader.uploadLogo.single(fieldNameForLogo), Controller.insert) 

Router.route('/getAll')
    .get(Controller.find)

Router.route('/search') 
    .get(Controller.search) 

//put this part at last
Router.route('/:id')
    .get(Controller.findById)
    .put(LogoUploader.uploadLogo.single(fieldNameForLogo),Controller.update)  
    .delete(Controller.remove) 
    
module.exports = Router 