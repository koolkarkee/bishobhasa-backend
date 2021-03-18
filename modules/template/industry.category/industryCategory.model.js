const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IndustryCategorySchema = new Schema({
    name : {
        type : String,
        unique : true,
        required : true,
        trim : true 
    }
}, {
    timestamps : true
})

const IndustryCategoryModel = mongoose.model('industryCategory', IndustryCategorySchema)
module.exports = mongoose.models.IndustryCategoryModel || IndustryCategoryModel 
