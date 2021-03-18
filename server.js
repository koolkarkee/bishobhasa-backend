var express = require('express')
const Port = require('./configs').port

var app = express()
//this app is entire express framework

//database
require('./database/db') 

//load third party middlewares
const ThirdParty = require('./middlewares/thirdparty')
ThirdParty.load(app) 

//inbuilt middleware (for images, videos and other files)
//app.use(express.static('files')) //serve locally within express
//app.use('files', express.static('files')) //serve for external request

//load routing level middleware 
const ApiRoute = require('./routes/api.routes') 
app.use('/api', ApiRoute) 

//configuration block
app.use((request, response, next) => { 
    next({ 
        msg : "Not Found",
        status : 404
    })
})

//error handling middleware
app.use((err, req, res, next)=>{
    console.log('From Error Handling Middleware')
    res
        .status(err. status || 400)
        .json({
            msg : err.msg || err,
            status : err.status || 400
        })
    console.log('err >> ', err)
})

app.listen(Port, (err, success) => {
    if(err) {
        console.log('server listening failed') 
    } else {
        console.log('success listening at port >> ' + Port, success)
    }
}) 