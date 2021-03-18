const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({ 
    //db modeling
    name : { 
        type : String 
    },
    username : {
        type : String,
        unique : true,
        required : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String, 
        unique : true
    },
    phone : {
        type : Number
    },
    address : {
        temporary_address : [String],
        permanent_address : String
    },
    dob : {
        type : Date
    },
    avatar : {
        type : String
    },
    gender : {
        type : String,
        enum : ['male', 'female', 'others']
    },
    role : {
        type : Number, 
        default : 1
    },
    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive'
    },
    emailToken : {
        type : String
    },
    emailTokenExpiryDate : {
        type : Date
    },
    emailConfirmed : {
        type : Boolean,
        default : false
    }
}, 
{
    timestamps : true
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = mongoose.models.UserModel || UserModel
