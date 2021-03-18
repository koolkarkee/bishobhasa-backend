const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogoTemplateSchema = new Schema({ 
    //db modeling
    name : { 
        type : String,
        required : true,
        trim : true 
    },  
    svgFile : {
        type : String,
        required : true,
        unique : true
    }, 
    theme : {
        type : String,   
        trim : true 
    },
    industryCategory : { 
        type: Array
    },
    designer : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive'
    },
    company : {
        type : String,
        default : 'Company'
    },
    companySlogan : {
        type : String,
        default : 'Slogan'
    } 
}, 
{
    timestamps : true
})

const LogoTemplateModel = mongoose.model('logoTemplate', LogoTemplateSchema)
module.exports = mongoose.models.TemplateModel || LogoTemplateModel
