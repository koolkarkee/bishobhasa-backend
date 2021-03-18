var express = require('express')
const Router = express.Router() 
const Authenticate = require('./../../middlewares/authenticate') 
const Authorize = require('./../../middlewares/authorize') 

const Controller = require('./auth.controller')  

Router.route('/') 
    .get(Authenticate, Controller.find) 

Router.route('/register') 
    .post(Controller.insertUser) 

Router.route('/verify')
    .get(Controller.verifyUser)

Router.route('/login')  
    .post(Controller.login)

Router.route('/forgot-password')
    .post(Controller.forgotPassword)  

Router.route('/reset-password')
    .post(Controller.resetPassword)

module.exports = Router