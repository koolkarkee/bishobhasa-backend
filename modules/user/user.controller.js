const Query = require('./user.query')

function insert(req, res, next){
    Query
        .insert(req.body)
        .then(data => {            
            res.status(200).json(data)
        }) 
        .catch(err => {
            console.log('error while inserting user >> ', err)
            return next(err)
        }) 
}

function find(req, res, next){
    var condition = {}
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
    Query
        .update(req.params.id, req.body)
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(err => {
            console.log('error while updating user >> ', err)
            return next(err)
        }) 
}

function remove(req, res, next){ 
    Query
        .remove(req.params.id)
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(err => {
            console.log('error while removing user >> ', err)
            return next(err)
        }) 
}

function search(req, res, next){
    var condition = {  } //search params here

    //TODO: build search query 

    Query
        .search(condition, req.query)
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(err => {
            console.log('error while finding user >> ', err)
            return next(err)
        }) 
}
 
module.exports = {
    insert,
    find,
    findById,
    update,
    remove,
    search
}