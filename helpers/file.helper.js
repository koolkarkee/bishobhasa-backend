const Fs = require('fs')
const Path = require('path')

//filePath is the path for the file to be saved
function isValidFileFormat(mimetypeToValidate, file, rootDirectory, filePath){
     //check for file format
     var result = 'false'

     if(file){ 
        var filemimetype = file.mimetype    

        if(filemimetype.split('/')[1] != mimetypeToValidate.split('/')[1]){
            result = 'false'
        }else{
            result = 'true'
        }

        console.log('result >> ', result)
        return result
    }
}

function remove(relativeFilePath, rootDirectory) {
    return new Promise((resolve, reject) => {
        var fullPath = Path.join(rootDirectory, relativeFilePath)

        Fs.unlink(fullPath, err => {
            reject(err)
        })
        resolve({ msg : 'file removed'})
    })
}

function removeFile(path){
    return new Promise((resolve, reject) => {
        Fs.unlink(path, err => {
            reject(err)
        })
        resolve({ msg : 'file removed'})
    })
}

module.exports = {
    isValidFileFormat,
    remove,
    removeFile
}