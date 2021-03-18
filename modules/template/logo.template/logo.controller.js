const Query = require('./logo.query') 
const DataFileOperationHelper = require('./../../../helpers/datafileoperation.helper')

function insert(req, res, next){
    //file upload 
    if(req.fileErr){
        return next({
            msg : "invalid file format!",
            status : 400
        }) 
    }

    if(req.file){ 
        req.body.name = req.body.name ? req.body.name : req.file.filename
        req.body.svgFile = req.file.destination + req.file.filename
    }

    Query
        .insert(req.body)
        .then(data => {            
            res.status(200).json(data)
        })
        .catch(err => {
            console.log('error while inserting data >> ', err)
            return next(err)
        }) 
}

function getAll(req, res, next){
    var condition = {}
    Query
        .find(condition, req.query)
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(err => {
            console.log('error while finding data >> ', err)
            return next(err)
        }) 
}

function findById(req, res, next){
    var condition = { _id : req.params.id }
    Query
        .find(condition)
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(err => {
            console.log('error while finding user >> ', err)
            return next(err)
        }) 
}  

function update(req, res, next){
    console.log('request body in update >> ', req.body)
    console.log('request params id >> ', req.params.id)

    //file upload 
    if(req.fileErr){
        return next({
            msg : "invalid file format!",
            status : 400
        }) 
    }
    
    if(req.file){   
        //set values for req body
        req.body.name = req.body.name ? req.body.name : req.file.filename
        req.body.svgFile = req.file.destination + req.file.filename
    } else {
        req.body.name = req.body.name ? req.body.name : (Date.now() + '')
    }
    
    var fileProperty = 'svgFile'
    DataFileOperationHelper.findAndUpdate(req, res, next, Query, fileProperty)
} 

function remove(req, res, next){ 
    //target property from model that links to file
    var fileProperty = 'svgFile'

    DataFileOperationHelper.removeAndUpdate(req, res, next, Query, fileProperty)
}

function search(req, res, next){
    console.log('search query >> ', req.body)   
    console.log('industry category >> ', req.body.industryCategory)

    let conditionIndustryCategory =  {
        industryCategory : {
            $in : req.body.industryCategory
        } 
    }

    let conditionTheme =  {
        theme : {
            $regex : req.body.theme,
            $options : "i"
        }
    }

    let conditionName = {
        name : {
            $regex : req.body.name,
            $options : "i"
        }
    }
     
    var condition = { 
        $and : [conditionIndustryCategory, conditionTheme, conditionName] 
    }  

    Query
        .search(condition, req.query)
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(err => {
            console.log('error while searching >> ', err)
            return next(err)
        }) 
}

module.exports = {
    insert,
    find: getAll,
    findById,
    update,
    remove,
    search
}

