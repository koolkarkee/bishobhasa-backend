const Model = require('./user.model')
const Mapper = require('./user.mapper')
const Hasher = require('./../auth/auth.hasher')
const EmailHelper = require('./user.emailhelper')
const Pagination = require('./../../helpers/pagination.helper') 

function map(data){ 
    var result = new Model({})
    result = Mapper(result, data)
    return result
}

function insert(data){   
    //email verification process
     //step 1 - create and store random guid
    var myUser = Mapper(new Model({}), data)

    //create uuid
    myUser.emailToken = EmailHelper.getEmailRegistrationToken()

    //set token expirty date 
    myUser.emailTokenExpiryDate = EmailHelper.getEmailTokenExpiryDate() 

    console.log('user email token >> ', myUser.emailToken)
    console.log('token expirty date >>', myUser.emailTokenExpiryDate)

    //then save the user
    return myUser.save()
}

function find(condition, options = {}){
    let pagination = Pagination(options) 
 
    return Model
        .find(condition)
        .limit(pagination[0]) 
        .skip(pagination[1])  
        .sort({_id : -1}) 
        .exec() 
}

function update(id, data){
    var condition = { _id : id }
    console.log('updated user in query file >> ', data)
    
    return new Promise((resolve, reject) => {
        Model.findOne(condition, (err, user) => {
            if(err) 
                reject(err)
            if(user == null)
                reject({ msg : "Invalid User" })
            else { 
                Mapper(user, data) //update given values 
                console.log('updating values in user >> ', user)
                user.save((err, result) => {
                    if(err)
                        reject(err)
                    
                    resolve(result)
                }) 
            }
        })
    })
}   

function remove(id){ 
    var condition = { _id : id }
    return new Promise((resolve, reject) => {
        Model.findOne(condition).exec((err, user) => { 
            if(err) 
                reject(err)
            if(user == null)
                reject({ msg : "User does not exist already" })
            else { 
                user.remove((err, removed) => {
                    if(err)
                        reject(err)
                    resolve(removed)
                })
            }
        })
    })
}

function login(data){ 
    var model = map(data) 
    
    return new Promise((resolve, reject) => {
        var condition = { username : model.username } 

        Model.findOne(condition, (err, user) => {
            if(err) 
                reject(err)
            if(user == null){ 
                reject({ msg : "Invalid User while logging in"})
            }    
            if(user != null){  
                var isMatch = Hasher.verifyPassword(model.password, user.password) //passwordHash.verify(model.password, user.password)
                if(!isMatch){
                    reject({ msg : "invalid user/password"})
                }
        
                //password is now matched
                resolve(user) 
            } 
        })
    }) 
}

function search(condition, options = {}){
    console.log('search condition >> ', condition)
    return find(condition,options) 
}

module.exports = { 
    insert, 
    find,
    update,
    remove,
    login,
    search 
}