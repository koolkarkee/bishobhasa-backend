const FileHelper = require('./file.helper')

function _updateData(req, res, next, Query) {
    console.log('req body ready to update >> ', req.body)
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

function _removeDuplicateFile(next, err, path) {
    FileHelper
        .removeFile(path)
        .then(success => {
            console.log('successfully removed file at', path)

            return next(err)
        })
        .catch(fileErr => {
            return next(fileErr)
        })
}

function _skipFileRemovalAndUpdate(req, res, next, Query, fileProperty) {
    //skip file operation  
    console.log('from skipping >> ', req.oldValues);        
    req.body[fileProperty] = req.oldValues[fileProperty] 

    _updateData(req, res, next, Query) 
}

function _dontSkipFileRemovalAndUpdate(req, res, next, Query) {
    console.log('from not skipping >> ', req.oldValues)
    //remove old file
    FileHelper
        .removeFile(req.oldValues.svgFile)
        .then(removed => {
            console.log('old file removed >> ', removed)

            //update 
            _updateData(req, res, next, Query) 
        })
        .catch(err => {
            //remove that same file in case of err
            _removeDuplicateFile(next, err, req.file.destination + req.file.filename) 
        }) 
}

function _startFileOperation(req, res, next, Query, fileProperty) {
    if(req.file){ 
        _dontSkipFileRemovalAndUpdate(req, res, next, Query)       
    } else { 
        _skipFileRemovalAndUpdate(req, res, next, Query, fileProperty) 
    } 
}

function findAndUpdate(req, res, next, Query, fileProperty) { 
    var oldValues = {};
    Query 
        .find({ _id : req.params.id })  
        .then(data => {
            oldValues = data[0] 
            console.log('old values from query >> ', oldValues)

            if(!oldValues){
                return next({
                    msg : 'no values, may have been already deleted. please check and try later',
                    status : 400
                }) 
            }else{ //start file operation for update
                req.oldValues = oldValues
                _startFileOperation(req, res, next, Query, fileProperty)
            } 
        })
        .catch(err => {
            return next(err)
        })  
}

function removeAndUpdate(req, res, next, Query, fileProperty) {
    Query
        .remove(req.params.id)
        .then(data => {
            console.log('from remove and update file -- value of data[fileProperty] >> ', data[fileProperty]);
            
            //remove file
            FileHelper
                .remove(data[fileProperty], process.cwd())
                .then(removed => {
                    console.log('file removed >> ', removed)
                    res.status(200).json(data)
                })
                .catch(err => { 
                    next(err)
                })
        }) 
        .catch(err => {
            console.log('error while removing >> ', err)
            return next(err)
        }) 
}

module.exports = {
    findAndUpdate,
    removeAndUpdate
}
