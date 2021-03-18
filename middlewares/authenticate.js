const JWT = require('jsonwebtoken')
const Config = require('./../configs')

const UserModel = require('./../modules/user/user.model')      

module.exports = function(req, res, next){  
    let token;
    if(req.headers['x-access-token']){
        token = req.headers['x-access-token']
    }
    if(req.headers['authorization']){
        token = req.headers['authorization']
    }
    if(req.headers['token']){
        token = req.headers['token']
    }
    if(req.query.token){
        token = req.query.token
    }

    console.log('jwt token >> ', token);
    if(!token){
        next({
            msg : 'token not provided',
            status : 400
        })
    }

    //verify the token
    token = token.split(' ')[1]
    JWT.verify(token, Config.JWT_secret, (err, decoded) => {
        console.log('jwt token >> ', token);
        
        if(err){
            return next(err)
        }

        console.log('decoded value >> ', decoded)
        //else
        UserModel.findById(decoded._id)
            .exec((err, user) => {
                if(err) return next(err)
                if(!user) {
                    next({
                        msg : "User not found or does not exist in the system",
                        status : 400
                    })
                }
                if(user) {
                    req.loggedInUser = decoded
                    //by pass the middleware
                    next()
                }
            }) 
    
    })
}