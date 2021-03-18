const PasswordHash = require('password-hash')
const JWT = require('jsonwebtoken')
const Config = require('../../configs')

function createToken(data){ //generating jwt token
    return JWT.sign(data, Config.JWT_secret) 
}

function generateHash(password){
    return PasswordHash.generate(password)
}

function verifyPassword(password, hashedPassword) {
    return PasswordHash.verify(password, hashedPassword)
}  

module.exports = {
    createToken,
    generateHash,
    verifyPassword
}