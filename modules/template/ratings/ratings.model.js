const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose, 2)

const Schema = mongoose.Schema

const RatingsSchema = new Schema({
    stars : {
        type : Float
    },
    comments : {
        type : String
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user' 
    } 
}, {
    timestamps : true
})