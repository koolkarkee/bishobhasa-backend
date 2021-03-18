const Router = require('express').Router()
const Controller = require('./user.controller')
const Authenticate = require('./../../middlewares/authenticate')

Router.route('/search') 
    .post(Controller.search)

//put this part at last
Router.route('/:id')
    .get(Controller.findById)
    .put(Controller.update)
    .delete(Controller.remove) 
    
module.exports = Router