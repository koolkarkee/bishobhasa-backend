const Query = require('./../user/user.query')

function insertUser(data){
    console.log("request body", data) 
    return Query.insert(data)
}

function login(data){
    return Query.login(data) 
}

function find(condition, options){ 
    return Query.find(condition, options)
}

function verifyUser(emailToken){
    return Query.find({ emailToken : emailToken}) 
}

function updateUser(id, user){
    console.log('user in user query >> ', user)
    return Query.update(id, user)
}

module.exports = {
    insertUser,
    login,
    find,
    verifyUser,
    updateUser
}
