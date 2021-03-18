const Query = require('./auth.query')
const Hasher = require('./auth.hasher')   
const EmailHelper = require('./../user/user.emailhelper')

//find a user
function find(req, res, next){
    var condition = {}
    
    console.log('from auth controller >> ')
    Query
        .find(condition, req.query) 
        .then(data => {
            console.log('success from auth find >> ', data)
            res.status(200).json(data)
        })
        .catch(err => {
            console.log('err from auth controller >> ', err)
            return next(err)
        })
}

//for register
function insertUser(req, res, next){
    //hash the password first
    req.body.password = Hasher.generateHash(req.body.password) //PasswordHash.generate(req.body.password) 

    Query
        .insertUser(req.body) 
        .then(user => {
            console.log('registered successfully >> ', user) 
            console.log('registered user id >> ', user._id)

            //send email verification link
            EmailHelper.sendRegistrationLink(user.email, user._id, user.emailToken)

            res.status(200).json(user)
        })
        .catch(err => {
            console.log('error while registering user >> ', err)
            return next(err) 
        })            
}

//for login 
function login(req, res, next){ 
    Query
        .login(req.body)
        .then(user => {
            console.log('successfully logged in >> ', user)

            var token = Hasher.createToken({ 
                name : user.username,
                role : user.role,
                _id : user._id
            })  

            //generate token and respond
            res.status(200).json({
                user : user,
                token : token
            }) 
        })
        .catch(err => {
            console.log('error while logging user >> ', err)
            return next(err)
        })   
}

//for user verification
function verifyUser(req, res, next){
    //retrieve the email token
    //verify it
    //if verified, set the variables and return result 
    var emailToken = req.query.emailToken
    console.log('email token retrieved >> ', emailToken)

    var id = req.query.id
    console.log('user id >> ', id)

    //check for null tokens
    if(emailToken == null || emailToken == '' || id == null || id == ''){ 
        return next({
            msg : 'invalid request',
            status : 404
        })
    }

    //proceed towards verification
    Query
        .verifyUser(emailToken) 
        .then(user => { 
            user = user[0]            
            console.log('to be verified user >> ', user)
            if(!user){
                return next({
                    msg : 'invalid emailConfirmation token',
                    status : 404
                })
            }

            console.log('is user email confirmed >> ', user.emailConfirmed)
            if(user.emailConfirmed == true){ 
                return next({
                    msg : 'user email is already confirmed, invalid request',
                    status : 404
                })
            }

            //start the verification by verifying emailTokenExpiryDate  
            var currentDate = new Date()
            tokenExpiryDate = (Date)(user.tokenExpiryDate)
            //var tokenExpiryDate = new Date(1988, 1, 1, 2, 2, 2, 2) //fake value for testing

            console.log('current date >> ', currentDate) 
            console.log('token expiry date >> ', tokenExpiryDate)

            if(currentDate > tokenExpiryDate){
                return next({
                    msg : 'email token has already expired',
                    status : 404
                })
            }

            //update the user by nullyfying token and expiry date
            user.emailToken = ' '
            user.emailTokenExpiryDate = new Date(1970, 1, 1, 2, 2, 2, 2) //set the date way back
            user.emailConfirmed = true  
            console.log('user.emailTokenExpiryDate >> ', user.emailTokenExpiryDate)

            Query
                .updateUser(id, user)
                .then(updated => {
                    console.log('verified successfully >> ', updated) 
                    res.status(200).json(updated) 
                })
                .catch(err => {
                    return next(err)
                }) 
        })
        .catch(err => {
            console.log('error while verifying user >> ', err)
            return next(err) 
        })      
}

//forgot-password implementation
function forgotPassword(req, res, next){
    //get email
    var email = req.body.email

    if(email == null || email == '')
        return next({ msg : "invalid request", status : 404 }) 
    
    //get user by email
    Query
        .find({ email : email })
        .then(user => {
            user = user[0]
            console.log('user >> ', user)

            if(!user){
                return next({
                    msg : 'user does not exist',
                    status : 404
                })
            }

            //proceed to update emailToken and userConfirmed
            user.emailToken = EmailHelper.getEmailRegistrationToken()
            user.emailTokenExpiryDate = EmailHelper.getEmailTokenExpiryDate()
            user.emailConfirmed = false

            console.log('email token >> ', user.emailToken)
            console.log('email token expiration >> ', user.emailTokenExpiryDate)
            console.log('email confirmed >> ', user.emailConfirmed)

            //update and send email confirmation
            var id = user._id
            console.log('user id >> ', id)

            console.log('user before update >> ', user)
            Query
                .updateUser(id, user)
                .then(updated => {
                    console.log('updated user >> ', updated)
                    console.log('email confirmed updated >> ', updated.emailConfirmed)

                    //send email confirmation link
                    EmailHelper.sendRegistrationLink(updated.email, id, updated.emailToken)
                    res.status(200).json(updated) 
                })
                .catch(err => {
                    return next(err) 
                })
        }) 
        .catch(err => {
            return next(err) 
        })
}

function resetPassword(req, res, next){
    //retrieve the email token
    //verify it
    //if verified, set the variables and return result 
    var emailToken = req.query.emailToken
    console.log('email token retrieved >> ', emailToken)

    var id = req.query.id
    console.log('user id >> ', id)

    //check for null tokens
    if(emailToken == null || emailToken == '' || id == null || id == ''){ 
        return next({
            msg : 'invalid request',
            status : 404
        })
    }

    //proceed towards verification
    Query
        .verifyUser(emailToken) 
        .then(user => { 
            user = user[0]            
            console.log('to be verified user >> ', user)
            if(!user){
                return next({
                    msg : 'invalid emailConfirmation token',
                    status : 404
                })
            }

            console.log('is user email confirmed >> ', user.emailConfirmed)
            if(user.emailConfirmed == true){ 
                return next({
                    msg : 'user email is already confirmed, invalid request',
                    status : 404
                })
            }

            //start the verification by verifying emailTokenExpiryDate  
            var currentDate = new Date()
            tokenExpiryDate = (Date)(user.tokenExpiryDate)
            //var tokenExpiryDate = new Date(1988, 1, 1, 2, 2, 2, 2) //fake value for testing

            console.log('current date >> ', currentDate) 
            console.log('token expiry date >> ', tokenExpiryDate)

            if(currentDate > tokenExpiryDate){
                return next({
                    msg : 'email token has already expired',
                    status : 404
                })
            }

            //update the user by nullyfying token and expiry date and the new password
            user.emailToken = ' '
            user.emailTokenExpiryDate = new Date(1970, 1, 1, 2, 2, 2, 2) //set the date way back
            user.emailConfirmed = true  
            user.password = Hasher.generateHash(user.password) //PasswordHash.generate(user.password)
            console.log('hashed password >> ', user.password)
            console.log('user.emailTokenExpiryDate >> ', user.emailTokenExpiryDate)

            Query
                .updateUser(id, user)
                .then(updated => {
                    console.log('password changed successfully >> ', updated) 

                    //send the password reset update via email
                    EmailHelper.sendMailAfterPasswordReset(user.username, user.email)
                    res.status(200).json(updated) 
                })
                .catch(err => {
                    return next(err)
                }) 
        })
        .catch(err => {
            console.log('error while verifying user >> ', err)
            return next(err) 
        })      
}

module.exports = {
    find,
    insertUser,
    login,
    verifyUser,
    forgotPassword,
    resetPassword
}