const Mongoose = require('mongoose')
const DbConfig = require('../configs/db.config')

Mongoose.connect(DbConfig.connectionUrl + '/' + DbConfig.dbName, 
    { useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true } , (err, success) => {
    if(err){
        console.log('connection err >> ', err)
    }else{
        console.log('successfully connected with database : >> ' + DbConfig.dbName)
    } 
}) 