const Query = require('./industryCategory.query')

function insert(req, res, next){
    console.log('request body >> ', req.body)
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

function find(req, res, next){
    var condition = {}
    var rows 

    Query
        .find(condition, req.query)
        .then(data => {   
            rows = data 
            return Query.findTotalRowsCount() 
        })  
        .then(count => {  
            var result = {
                totalRowsCount : count,
                rows
            }

            res.status(200).json(result)
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
    
    Query
        .update(req.params.id, req.body)
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(err => {
            console.log('error while updating >> ', err)
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
            console.log('error while removing >> ', err)
            return next(err)
        }) 
}

function search(req, res, next){
    console.log('search query >> ', req.query)

    var conditionName = {
            $regex : req.query.name,
            $options : "i"
    } 

    var condition = {
        $and : [{name : conditionName}]  
    }
    console.log('condition name >> ', conditionName) 

    console.log('req body >> ', req.body) 

    var conditionCreatedAt
    if(req.body.startDate && req.body.endDate){
        const startDate = new Date(new Date(req.body.startDate).setHours(0,0,0,0))
        const endDate = new Date(new Date(req.body.endDate).setHours(23, 59, 59, 9999)) 
        
        conditionCreatedAt = {
            $gte : startDate,
            $lt : endDate
        }    

        console.log('condition createdAt >> ', conditionCreatedAt)
        condition = {
            $and : [{name : conditionName}, {createdAt : conditionCreatedAt}]  
        }
    }  
    
    Query
        .search(condition, req.query)
        .then(data => {   
            rows = data 
            return Query.findTotalRowsCount(condition) 
        }) 
        .then(count => {  
            var result = {
                totalRowsCount : count,
                rows
            }

            res.status(200).json(result)
        }) 
        .catch(err => {
            console.log('error while searching >> ', err)
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
