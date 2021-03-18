const Router = require('express').Router()
const Controller = require('./industryCategory.controller')

Router.route('/insert')
    .post(Controller.insert)

Router.route('/getAll')
    .get(Controller.find)

Router.route('/search') 
    .get(Controller.search) 
    .post(Controller.search)

//put this part at last
Router.route('/:id')
    .get(Controller.findById)
    .put(Controller.update)
    .delete(Controller.remove) 
    
module.exports = Router 